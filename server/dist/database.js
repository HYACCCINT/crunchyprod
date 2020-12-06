"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const cloudant_1 = __importDefault(require("@cloudant/cloudant"));
const xml2js_1 = __importDefault(require("xml2js"));
const fs_1 = require("fs");
const usage = () => {
    console.log(`DB username/apikey not setup properly`);
    process.exit(1);
};
class Database {
    constructor(name = 'crunchy') {
        this.initialized = false;
        this.name = name;
        // Below is for production environment
        // if (!process.env.CLOUDANT_USERNAME || !process.env.CLOUDANT_KEY) {
        // 	usage();
        // }
        // this.cloudant = Cloudant({
        // 	account: process.env.CLOUDANT_USERNAME,
        // 	plugins: {
        // 		iamauth: { // eslint-disable-next-line object-curly-newline
        // 			iamApiKey: process.env.CLOUDANT_KEY
        // 		}
        // 	}
        // });
        // This would be http://USERNAME:PASSWORD@localhost:5984, modify as needed
        this.cloudant = cloudant_1.default('http://admin:crunchy@localhost:5984');
        this.cloudant.db.list().then((body) => {
            // create db if it doesn't exist, otherwise just use it
            if (!body.includes(this.name)) {
                this.cloudant.db.create(this.name).then(() => {
                    this.use();
                    this.initializeViews();
                });
            }
            else {
                this.use();
            }
        });
    }
    use(name = this.name) {
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
    get(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.db.get(id);
            return item;
        });
    }
    insert(id, value = undefined) {
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
    upsert(id, value, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let v = {};
            try {
                v = yield this.get(id);
            }
            catch (exception) {
                if (exception.statusCode !== 404) {
                    // 404 is ok, just means item is not yet in db and we have to insert it
                    // for the first time
                    // We log everything else
                    console.error(exception);
                    throw exception;
                }
            }
            return this.insert(id, Object.assign(v, value));
        });
    }
    delete(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let docObj;
            try {
                docObj = yield this.db.get(id);
            }
            catch (exception) {
                console.error(exception);
                throw exception;
            }
            return yield this.db.destroy(docObj._id, docObj._rev);
        });
    }
    getAllForms(req, limit = undefined, skip = 0, docId = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.db.view('forms', 'all-forms', {
                limit,
                skip,
                include_docs: true,
                startkey_docid: docId // eslint-disable-line camelcase
            })).rows.map((row) => row.value);
        });
    }
    getForm(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.get(id, req)
                .then((form) => { form.id = id; return form; });
            if (item.type !== 'form' && item.docType !== 'SDCForm') {
                return [null];
            }
            let formItems = [item];
            for (let sectionId of item.sectionIDs) {
                const section = yield this.getSection(sectionId, req);
                formItems.push(...section);
            }
            return formItems;
        });
    }
    getQuestion(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.get(id, req)
                .then((question) => { question.id = id; return question; });
            if (item.docType !== 'SDCQuestion') {
                return [null];
            }
            return [item];
        });
    }
    getSection(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.get(id, req)
                .then((section) => { section.id = id; return section; });
            if (item.docType !== 'SDCSection') {
                return [null];
            }
            let sectionItems = [item];
            for (let sectionId of item.subSectionIDs) {
                const section = yield this.getSection(sectionId, req);
                sectionItems.push(...section);
            }
            const flatQuestionsList = flatQuestions(item.questions);
            sectionItems.push(...flatQuestionsList);
            return sectionItems;
        });
    }
    updateForm(id, value, req) {
        return __awaiter(this, void 0, void 0, function* () {
            //functions for assembling section objects
            const updateIDs = (formObj, prefix) => {
                if (formObj.docType === "SDCForm") {
                    formObj.sectionIDs = formObj.sectionIDs.map((item) => item = `${prefix}-${item}`);
                }
                else if (formObj.docType === "SDCSection") {
                    formObj.subSectionIDs = formObj.subSectionIDs.map((item) => item = `${prefix}-${item}`);
                    formObj.superSectionID = formObj.superSectionID ? `${prefix}-${formObj.superSectionID}` : formObj.superSectionID;
                }
                else if (formObj.docType === "SDCQuestion") {
                    formObj.superSectionID = formObj.superSectionID ? `${prefix}-${formObj.superSectionID}` : formObj.superSectionID;
                }
            };
            const upsertAssembledSection = (sectionId, data) => __awaiter(this, void 0, void 0, function* () {
                const sectionObj = data.find((item) => item.docType === "SDCSection" && item.id === sectionId);
                const section = __rest(sectionObj, []);
                for (let subSectionID of section.subSectionIDs) {
                    yield upsertAssembledSection(subSectionID, data);
                }
                let questions = data.filter((item) => item.docType === "SDCQuestion" && item.superSectionID === sectionId);
                section.questions = [];
                questions.forEach((question) => section.questions.push(assembleQuestions(question, data)));
                try {
                    return yield this.upsert(sectionId, section, req);
                }
                catch (e) {
                    console.log("Could not upsert form response for section", sectionId, e);
                }
            });
            const assembleQuestions = (question, data) => {
                const subQuestions = data.filter((item) => item.docType === "SDCQuestion" && item.superQuestionID === question.id);
                question.subQuestions = subQuestions;
                return question;
            };
            if (!value)
                return {};
            value.forEach((element) => {
                if (element.docType === "SDCSection")
                    element.id = id + '-' + element.id;
                updateIDs(element, id);
            });
            const form = value[0];
            form.id = id;
            for (let sectionID of form.sectionIDs) {
                yield upsertAssembledSection(sectionID, value);
            }
            try {
                return yield this.upsert(id, form, req);
            }
            catch (e) {
                console.log("Could not upsert form response for form", id, e);
            }
        });
    }
    uploadForm(id, value, req) {
        return __awaiter(this, void 0, void 0, function* () {
            // value.lastModified = new Date().toISOString();
            let previousVersion = null;
            try {
                previousVersion = yield this.getForm(id, req);
            }
            catch (e) {
                console.warn("No previous versions of the form found");
            }
            value.previousVersion = previousVersion;
            value.docType = 'SDCForm';
            const form = yield this.parseXMLForm(value, req);
            return yield this.upsert(id, form, req);
        });
    }
    updateQuestion(id, value, req) {
        return __awaiter(this, void 0, void 0, function* () {
            // value.lastModified = new Date().toISOString();
            value.docType = 'SDCQuestion';
            return yield this.upsert(id, value, req);
        });
    }
    updateSection(id, value, req) {
        return __awaiter(this, void 0, void 0, function* () {
            // value.lastModified = new Date().toISOString();
            value.docType = 'SDCSection';
            return yield this.upsert(id, value, req);
        });
    }
    deleteForm(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let formObj;
            try {
                formObj = yield this.db.get(id);
            }
            catch (exception) {
                console.error(exception);
                throw exception;
            }
            if (!formObj || formObj.docType !== 'SDCForm') {
                throw 'Item not found';
            }
            return yield this.delete(id, req);
        });
    }
    getUser(id, password, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.get(id, req);
            if (item.docType !== 'user' || item.password !== password) {
                return null;
            }
            return item;
        });
    }
    updateUser(id, value, req) {
        return __awaiter(this, void 0, void 0, function* () {
            value.docType = 'user';
            return this.upsert(id, value, req);
        });
    }
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                user.docType = 'user';
                yield this.insert(user).then((response) => user.processAPIResponse(response));
                return user;
            }
            catch (error) {
                console.error('database register user error:', error);
                throw error;
            }
        });
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
        fs_1.readdirSync(folderName, { withFileTypes: true })
            .filter((entry) => entry.isDirectory())
            .forEach((designDocument) => {
            const documentFolderPath = `${folderName}/${designDocument.name}`;
            const views = {};
            fs_1.readdirSync(documentFolderPath, { withFileTypes: true })
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
                    const viewContent = fs_1.readFileSync(viewPath, 'utf8');
                    // if view_name not in views:
                    if (!Object.keys(views).includes(parts[parts.length - 2])) {
                        views[viewName] = { [parts[parts.length - 2]]: viewContent };
                    }
                    else {
                        views[viewName][parts[parts.length - 2]] = viewContent;
                    }
                }
            });
            console.log(designDocument);
            this.db.insert({ views }, `_design/${designDocument.name}`);
        });
    }
    /** Add objects to arbitraryProperties for new XML changes */
    parseXMLForm(input, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const parser = new xml2js_1.default.Parser();
            const inputJson = yield parser.parseStringPromise(input.xml);
            yield this.upsert("xml-testing", inputJson, req);
            const formDesignObj = inputJson.SDCPackage ? inputJson.SDCPackage.XMLPackage[0].FormDesign[0] : inputJson.FormDesign;
            let form = {
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
            };
            if (input.previousVersion) {
                const previousForm = input.previousVersion.find((item) => item.docType === "SDCForm");
                if (previousForm) {
                    form._rev = previousForm._rev;
                }
            }
            form.properties = formDesignObj.Property.map((item) => item.$);
            form.contact = formDesignObj.Body[0].Contact ? formDesignObj.Body[0].Contact[0].Organization.map((item) => ({
                organization: item.OrgName[0].$.val,
                email: item.Email.map((emailObj) => emailObj.EmailAddress[0].$.val)
            })) : {};
            form.sectionIDs = formDesignObj.Body[0].ChildItems ? yield Promise.all(formDesignObj.Body[0].ChildItems[0].Section.map((sectionObj) => __awaiter(this, void 0, void 0, function* () { return yield this.parseXMLSection(`${input.id}`, sectionObj, input.previousVersion, req); }))) : [];
            form.footer = `${formDesignObj.Footer[0].$.ID}${formDesignObj.Footer[0].$.title}`;
            return form;
        });
    }
    parseXMLSection(superID, sectionObj, previousVersion, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectionID = superID + '-' + sectionObj.$.ID;
            let section = {
                _id: sectionID,
                title: sectionObj.$.title,
                docType: "SDCSection",
                name: sectionObj.$.type,
                properties: sectionObj.Property ? sectionObj.Property.map((item) => item.$) : [],
                mustImplement: sectionObj.$.mustImplement && sectionObj.$.mustImplement === "false" ? false : true,
                superSectionID: superID,
                subSectionIDs: [],
                questions: [],
                arbitraryProperties: [],
            };
            if (previousVersion) {
                const sectionIDMap = previousVersion.filter((item) => item.docType === "SDCSection").map((item) => item._id);
                if (sectionIDMap.includes(sectionID)) {
                    section._rev = previousVersion.find((item) => item._id === sectionID)._rev;
                }
            }
            if (!sectionObj.ChildItems)
                return sectionID;
            section.subSectionIDs = sectionObj.ChildItems[0].Section ? yield Promise.all(sectionObj.ChildItems[0].Section.map((subSectionObj) => __awaiter(this, void 0, void 0, function* () { return (yield this.parseXMLSection(sectionID, subSectionObj, previousVersion, req)); }))) : [];
            section.questions = sectionObj.ChildItems[0].Question ? sectionObj.ChildItems[0].Question.map((questionObj) => this.parseXMLQuestion(questionObj, sectionID, null, null)) : [];
            yield this.upsert(sectionID, section, req);
            return sectionID;
        });
    }
    parseXMLQuestion(questionObj, superSectionID, superQuestionID, superAnswerID) {
        try {
            const x = (questionObj.$.ID);
        }
        catch (e) {
            console.log(questionObj);
        }
        let question = {
            id: questionObj.$.ID,
            title: questionObj.$.title,
            mustImplement: questionObj.$.mustImplement && questionObj.$.mustImplement === "false" ? false : true,
            name: questionObj.$.name,
            type: questionObj.$.type,
            docType: "SDCQuestion",
            path: superSectionID ? superSectionID.split('-') : [],
            superSectionID: superSectionID,
            superQuestionID: superQuestionID,
            superAnswerID: superAnswerID,
            response: { arbitraryProperties: [] },
            subQuestions: [],
            arbitraryProperties: [],
        };
        if (questionObj.ListField) {
            question.questionType = "single choice";
            question.response.userInput = [];
            question.response.choices = questionObj.ListField[0].List[0].ListItem ? questionObj.ListField[0].List[0].ListItem.map((item) => {
                if (!item.ChildItems)
                    return item.$;
                item.ChildItems[0].Question.map((subQuestionObj) => question.subQuestions.push(this.parseXMLQuestion(subQuestionObj, null, question.id, item.$.ID)));
                return item.$;
            }) : [];
        }
        else if (questionObj.ResponseField) {
            if (questionObj.ResponseField[0].Response[0].date) {
                question.questionType = "date";
                question.textAfterResponse = questionObj.ResponseField[0].TextAfterResponse ? questionObj.ResponseField[0].TextAfterResponse[0].$.val : "";
                question.response.userInput = "";
            }
            else if (questionObj.ResponseField[0].Response[0].string) {
                question.questionType = "text";
                question.response.userInput = questionObj.ResponseField[0].Response[0].string[0].$.val ? questionObj.ResponseField[0].Response[0].string[0].$.val : "";
            }
            else if (questionObj.ResponseField[0].Response[0].integer || questionObj.ResponseField[0].Response[0].decimal) {
                question.questionType = "number";
                question.textAfterResponse = questionObj.ResponseField[0].ResponseUnits ? questionObj.ResponseField[0].ResponseUnits[0].$.val : "";
                question.response.userInput = 0;
            }
        }
        question.response.responseType = question.questionType;
        return question;
    }
}
const flatQuestions = (questions) => {
    let flatList = [];
    for (let question of questions) {
        const { subQuestions } = question, questionWOSub = __rest(question, ["subQuestions"]);
        flatList.push(questionWOSub);
        subQuestions ? flatList.push(...flatQuestions(subQuestions)) : null;
    }
    return flatList;
};
exports.database = new Database();
//# sourceMappingURL=database.js.map