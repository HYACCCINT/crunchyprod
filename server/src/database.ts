import Cloudant from '@cloudant/cloudant';
import xml2js from 'xml2js';
import { readFileSync, readdirSync } from 'fs';
import { response } from 'express';

const usage = () => {
	console.log(`DB username/apikey not setup properly`);
	process.exit(1);
};

class Database {
	name: string;

	cloudant: Cloudant.ServerScope;
	db: Cloudant.DocumentScope<any> | any;
	initialized = false;

	constructor(name = 'crunchy') {
		this.name = name;

		// Below is for production environment
		// if (!process.env.CLOUDANT_USERNAME || !process.env.CLOUDANT_KEY) {
		// 	usage();
		// }

		this.cloudant = Cloudant({
			account: '85157620-dd07-478b-bc7b-9f7fe1003df9-bluemix',
			plugins: {
				iamauth: { // eslint-disable-next-line object-curly-newline
					iamApiKey: 'vU2S9yy3YH1vqXcV7NdxPHqn-Fudo0DsgBKX4PZGE0HY'
				}
			}
		});


		// This would be http://USERNAME:PASSWORD@localhost:5984, modify as needed
		// this.cloudant = Cloudant('http://admin:crunchy@localhost:5984');

		this.cloudant.db.list().then((body: any) => {
			// create db if it doesn't exist, otherwise just use it
			if (!body.includes(this.name)) {
				this.cloudant.db.create(this.name).then(() => {
					this.use();
					this.initializeViews();
				});
			} else {
				this.use();
			}
		});
	}

	use(name: string = this.name) {
		this.name = name;
		this.db = this.cloudant.use(this.name);
		this.initialized = true;
	}



	/**
	 * Fetches the item from the database or throws error.
	 * The error thrown might be surfaced in graphql.
	 *
	 * @param id identifier
	 * @param req http request received through express, contains info on authenticated user
	 */
	async get<T = object>(id: string, req?: any) {
		const item = await this.db.get(id);

		return item;
	}


	insert<T = object>(id: any, value: any = undefined) {
		return this.db.insert(value, id);
	}

	/**
	 * Inserts or updates the item to the database or throws error.
	 * The error thrown might be surfaced in graphql.
	 *
	 * @param id identifier
	 * @param req http request received through express, contains info on authenticated user
	 */
	// eslint-disable-next-line
	async upsert<T = object>(id: string, value: any, req?: any) {
		let v = {};
		try {
			v = await this.get(id);
		} catch (exception) {
			if (exception.statusCode !== 404) {
				// 404 is ok, just means item is not yet in db and we have to insert it
				// for the first time
				// We log everything else
				console.error(exception);
				throw exception;
			}
		}
		return this.insert(id, Object.assign(v, value));

	}

	async delete<T = object>(id: string, req?: any) {
		let docObj;
		try {
			docObj = await this.db.get(id);
		} catch (exception) {
			console.error(exception);
			throw exception;
		}
		return await this.db.destroy(docObj._id, docObj._rev);
	}

	async getAllForms(
		req: any,
		limit: number | undefined = undefined,
		skip = 0,
		docId: string | undefined = undefined
	) {
		return (await this.db.view('forms', 'all-forms', {
			limit,
			skip,
			include_docs: true, // eslint-disable-line camelcase
			startkey_docid: docId // eslint-disable-line camelcase
		})).rows.map((row: any) => row.value);
	}

	async getForm(id: string, req: any) {
		const item = await this.get(id, req)
			.then((form: any) => { form.id = id; return form; });

		if (item.type !== 'form' && item.docType !== 'SDCForm') {
			return [null];
		}

		let formItems = [item];
		for(let sectionId of item.sectionIDs) {
			const section = await this.getSection(sectionId, req);
			formItems.push(...section);
		}

		return formItems;
	}

	async getQuestion(id: string, req: any) {
		const item = await this.get(id, req)
			.then((question: any) => { question.id = id; return question; });

		if (item.docType !== 'SDCQuestion') {
			return [null];
		}

		return [item];
	}

	async getSection(id: string, req: any) {
		const item = await this.get(id, req)
			.then((section: any) => { section.id = id; return section; });

		if (item.docType !== 'SDCSection') {
			return [null];
		}

		let sectionItems = [item];
		for(let sectionId of item.subSectionIDs) {
			const section = await this.getSection(sectionId, req);
			sectionItems.push(...section);
		}
		const flatQuestionsList = flatQuestions(item.questions);
		sectionItems.push(...flatQuestionsList);

		return sectionItems;
	}

	async updateForm<T = object>(id: string, value: any, req: any) {
		//functions for assembling section objects
		const updateIDs = (formObj: any, prefix: string) => {
			if (formObj.docType === "SDCForm"){
				formObj.sectionIDs = formObj.sectionIDs.map((item: any) => item = `${prefix}-${item}`);
			}
			else if(formObj.docType === "SDCSection") {
				formObj.subSectionIDs = formObj.subSectionIDs.map((item: any) => item = `${prefix}-${item}`)
				formObj.superSectionID = formObj.superSectionID ? `${prefix}-${formObj.superSectionID}`: formObj.superSectionID;
			}
			else if(formObj.docType === "SDCQuestion") {
				formObj.superSectionID = formObj.superSectionID ? `${prefix}-${formObj.superSectionID}`: formObj.superSectionID;
			}
		}
		const upsertAssembledSection = async (sectionId: string, data: any): Promise<any> => {
			const sectionObj = data.find((item: any) => item.docType === "SDCSection" && item.id === sectionId);
			const { ...section } = sectionObj;
			for(let subSectionID of section.subSectionIDs){
				await upsertAssembledSection(subSectionID, data);
			}
			let questions = data.filter((item: any) => item.docType === "SDCQuestion" && item.superSectionID === sectionId);
			section.questions = [];
			questions.forEach((question: any) => section.questions.push(assembleQuestions(question, data)));
			try {
				return await this.upsert(sectionId, section, req);
			}
			catch(e){
				console.log("Could not upsert form response for section", sectionId, e);
			}
		}

		const assembleQuestions = (question: any, data: any): any => {
			const subQuestions = data.filter((item: any) => item.docType === "SDCQuestion" && item.superQuestionID === question.id);
			question.subQuestions = subQuestions;
			return question;
		}

		if (!value) return {};
		value.forEach((element: any) => {
			if(element.docType === "SDCSection") element.id = id + '-' + element.id;
			updateIDs(element, id);
		});
		const form = value[0];
		form.id = id;
		for(let sectionID of form.sectionIDs){
			await upsertAssembledSection(sectionID, value);
		}
		try{
			return await this.upsert(id, form, req);
		}
		catch(e){
			console.log("Could not upsert form response for form", id, e);
		}
	}

	async uploadForm<T = object>(id: string, value: any, req: any) {
		// value.lastModified = new Date().toISOString();
		let previousVersion = null;
		try {
			previousVersion = await this.getForm(id, req);
		}
		catch(e){
			console.warn("No previous versions of the form found");
		}
		value.previousVersion = previousVersion;
		value.docType = 'SDCForm';
		const form = await this.parseXMLForm(value, req);
		return await this.upsert(id, form, req);
	}

	async updateQuestion<T = object>(id: string, value: any, req: any) {
		// value.lastModified = new Date().toISOString();
		value.docType = 'SDCQuestion';
		return await this.upsert(id, value, req);
	}

	async updateSection<T = object>(id: string, value: any, req: any) {
		// value.lastModified = new Date().toISOString();
		value.docType = 'SDCSection';
		return await this.upsert(id, value, req);
	}

	async deleteForm<T = object>(id: any, req: any) {
		let formObj;
		try {
			formObj = await this.db.get(id);
		} catch (exception) {
			console.error(exception);
			throw exception;
		}
		if (!formObj || formObj.docType !== 'SDCForm') {
			throw 'Item not found';
		}
		return await this.delete(id, req);
	}
	async getUser(id: string, password: string, req: any) {
		const item = await this.get(id, req);
		if (item.docType !== 'user' || item.password !== password) {
			return null;
		}
		return item;
	}
	async updateUser(id: string, value: any, req: any) {
		value.docType = 'user';
		return this.upsert(id, value, req);
	}

	async registerUser(user: any) {
		try {
			user.docType = 'user';
			await this.insert(user).then(
				(response: any) => user.processAPIResponse(response)
			);
			return user;
		} catch (error) {
			console.error('database register user error:', error);
			throw error;
		}
	}

	initializeViews(folderName = 'db-views') {
		// `db-views` folder structure
		// db-views/
		// └── designdoc1
		//     ├── view-name-1.map.js
		//     ├── view-name-1.reduce.js
		//     ├── view-name-2.map.js
		//     └── view-name-2.reduce.js
		// └── designdoc2
		//     ├── view-name-1.map.js
		//     ├── view-name-1.reduce.js
		//     ├── view-name-2.map.js
		//     └── view-name-2.reduce.js

		// we want all the views to be initialized before we start using db so we use sync
		readdirSync(folderName, { withFileTypes: true })
			.filter((entry) => entry.isDirectory())
			.forEach((designDocument) => {
				const documentFolderPath = `${folderName}/${designDocument.name}`;
				const views: any = {};

				readdirSync(documentFolderPath, { withFileTypes: true })
					.filter((entry) => entry.isFile())
					.forEach((file) => {
						const viewPath = `${documentFolderPath}/${file.name}`;
						const parts = file.name.split('.');

						if (parts.length < 3) { // doesn't look like a legitimate view function
							return;
						}

						// in case there are `.`s in the actual view name
						const viewName = parts.slice(0, parts.length - 2).join('.');

						if (parts[parts.length - 2] === 'map' || parts[parts.length - 2] === 'reduce') {
							const viewContent = readFileSync(viewPath, 'utf8');
							// if view_name not in views:
							if (!Object.keys(views).includes(parts[parts.length - 2])) {
								views[viewName] = { [parts[parts.length - 2]]: viewContent };
							} else {
								views[viewName][parts[parts.length - 2]] = viewContent;
							}
						}
					});
				console.log(designDocument);
				this.db.insert({ views }, `_design/${designDocument.name}`);
			});
	}

	/** Add objects to arbitraryProperties for new XML changes */
	async parseXMLForm(input: any, req: any): Promise<any> {
		const parser = new xml2js.Parser();
		const inputJson = await parser.parseStringPromise(input.xml);
		await this.upsert("xml-testing", inputJson, req);
		const formDesignObj = inputJson.SDCPackage ? inputJson.SDCPackage.XMLPackage[0].FormDesign[0] : inputJson.FormDesign;
		let form: any = {
			_id: inputJson.id,
			docType: "SDCForm",
			uri: formDesignObj.$.fullURI,
			title: formDesignObj.$.formTitle,
			procedureID: formDesignObj.$.ID,
			lineage: formDesignObj.$.lineage,
			version: formDesignObj.$.version,
			filename: input.filename,
			xmlns: formDesignObj.$.xmlns,
			"xmlns:xsi": formDesignObj.$["xmlns:xsi"],
			patientID: "template",
			previousVersion: JSON.stringify(input.previousVersion),
			arbitraryProperties: [],
		}
		if(input.previousVersion){
			const previousForm = input.previousVersion.find((item: any) => item.docType === "SDCForm");
			if(previousForm) {
				form._rev = previousForm._rev;
			}
		}
	
		form.properties = formDesignObj.Property.map((item: any) => item.$);
		form.contact = formDesignObj.Body[0].Contact ? formDesignObj.Body[0].Contact[0].Organization.map((item: any) => ({
			organization: item.OrgName[0].$.val,
			email: item.Email.map((emailObj: any) => emailObj.EmailAddress[0].$.val)
		})) : {};
		form.sectionIDs = formDesignObj.Body[0].ChildItems ? await Promise.all(formDesignObj.Body[0].ChildItems[0].Section.map(
			async (sectionObj: any) => await this.parseXMLSection(`${input.id}`, sectionObj, input.previousVersion, req)
		)) : [];
	
		form.footer = `${formDesignObj.Footer[0].$.ID}${formDesignObj.Footer[0].$.title}`;
		return form;
	}

	async parseXMLSection(superID: string, sectionObj: any, previousVersion: any, req: any): Promise<any> {
		const sectionID = superID + '-' + sectionObj.$.ID;
		let section: any = {
			_id: sectionID,
			title: sectionObj.$.title,
			docType: "SDCSection",
			name: sectionObj.$.type,
			properties: sectionObj.Property ? sectionObj.Property.map((item: any) => item.$) : [],
			mustImplement: sectionObj.$.mustImplement && sectionObj.$.mustImplement === "false" ? false : true,
			superSectionID: superID,
			subSectionIDs: [],
			questions: [],
			arbitraryProperties: [],
		};
		if(previousVersion){
			const sectionIDMap = previousVersion.filter((item: any) => item.docType === "SDCSection").map((item: any) => item._id);
			if(sectionIDMap.includes(sectionID)){
				section._rev = previousVersion.find((item: any) => item._id === sectionID)._rev;
			}
		}

		if(!sectionObj.ChildItems) return sectionID;
		section.subSectionIDs = sectionObj.ChildItems[0].Section ? await Promise.all(sectionObj.ChildItems[0].Section.map(
			async (subSectionObj: any) => (await this.parseXMLSection(sectionID, subSectionObj, previousVersion, req))
		)) : [];
		section.questions = sectionObj.ChildItems[0].Question ? sectionObj.ChildItems[0].Question.map(
			(questionObj: any) => this.parseXMLQuestion(questionObj, sectionID, null, null)
		) : [];

		await this.upsert(sectionID, section, req);
		return sectionID;
	}

	parseXMLQuestion(questionObj: any, superSectionID: string, superQuestionID: string, superAnswerID: string): any {
		try {
			const x = (questionObj.$.ID);
		}
		catch(e){
			console.log(questionObj);
		}
		let question: any = {
			id: questionObj.$.ID,
			title: questionObj.$.title,
			mustImplement: questionObj.$.mustImplement && questionObj.$.mustImplement === "false" ? false : true,
			name: questionObj.$.name,
			type: questionObj.$.type,
			docType: "SDCQuestion",
			path: superSectionID? superSectionID.split('-'): [],
			superSectionID: superSectionID,
			superQuestionID: superQuestionID,
			superAnswerID: superAnswerID,
			response: <any>{ arbitraryProperties: [] },
			subQuestions: <any>[],
			arbitraryProperties: [],
		};

		if(questionObj.ListField) {
			question.questionType = "single choice";
			question.response.userInput = [];
			question.response.choices = questionObj.ListField[0].List[0].ListItem ? questionObj.ListField[0].List[0].ListItem.map(
				(item: any) => {
					if(!item.ChildItems) return item.$;
					item.ChildItems[0].Question.map(
						(subQuestionObj: any) => question.subQuestions.push(this.parseXMLQuestion(subQuestionObj, null, question.id, item.$.ID))
					)
					return item.$;
				}
			) : [];
		}
		else if(questionObj.ResponseField) {
			if(questionObj.ResponseField[0].Response[0].date){
				question.questionType = "date";
				question.textAfterResponse = questionObj.ResponseField[0].TextAfterResponse ? questionObj.ResponseField[0].TextAfterResponse[0].$.val : "";
				question.response.userInput = "";
			}
			else if(questionObj.ResponseField[0].Response[0].string){
				question.questionType = "text";
				question.response.userInput = questionObj.ResponseField[0].Response[0].string[0].$.val ? questionObj.ResponseField[0].Response[0].string[0].$.val : "";
			}
			else if(questionObj.ResponseField[0].Response[0].integer || questionObj.ResponseField[0].Response[0].decimal){
				question.questionType = "number";
				question.textAfterResponse = questionObj.ResponseField[0].ResponseUnits ? questionObj.ResponseField[0].ResponseUnits[0].$.val : "";
				question.response.userInput = 0;
			}
		}
		question.response.responseType = question.questionType;

		return question;
	}
}

const flatQuestions = (questions: any): any => {
	let flatList = [];
	for(let question of questions) {
		const {subQuestions, ...questionWOSub} = question;
		flatList.push(questionWOSub);
		subQuestions ? flatList.push(...flatQuestions(subQuestions)) : null;
	}
	return flatList;
}

export const database = new Database();
