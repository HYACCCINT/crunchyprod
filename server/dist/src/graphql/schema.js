"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { buildSchema } = require('graphql');
exports.schema = buildSchema(`
	scalar DataSetValue
	scalar Contact
	scalar MultipleChoice
	scalar UserResponse
	scalar InputType
	scalar ArbitraryProperty

	interface SDCQuestionResponse {
		id: String
		questionID: String
		responseType: String
		arbitraryProperties: [ArbitraryProperty]
	}
	type SDCMultipleChoiceResponse implements SDCQuestionResponse {
		id: String
		questionID: String
		responseType: String
		arbitraryProperties: [ArbitraryProperty]
		userInput: InputType
		choices: [MultipleChoice]
		canMultiSelect: Boolean
	}
	type SDCTextResponse implements SDCQuestionResponse {
		id: String
		questionID: String
		responseType: String
		arbitraryProperties: [ArbitraryProperty]
		userInput: InputType
		defaultValue: String
	}
	type SDCDateResponse implements SDCQuestionResponse {
		id: String
		questionID: String
		responseType: String
		arbitraryProperties: [ArbitraryProperty]
		userInput: InputType
		defaultValue: String
	}
	type SDCIntResponse implements SDCQuestionResponse {
		id: String
		questionID: String
		responseType: String
		arbitraryProperties: [ArbitraryProperty]
		userInput: InputType
		defaultValue: Int
	}
    type SDCQuestion {
		id: String
		docType: String
		name: String
		title: String
		mustImplement: Boolean
		readOnly: Boolean
		minCard: Int
		maxCard: Int
		maxSelections: Int
		questionType: String
		isEnabled: Boolean
		response: SDCQuestionResponse
		textAfterResponse: String
		subQuestions: [SDCQuestion]
		superSectionID: String
		superQuestionID: String
		superAnswerID: String
		arbitraryProperties: [ArbitraryProperty]
	}
	type SDCSection {
		id: String
		docType: String
		name: String
		title: String
		type: String
		mustImplement: Boolean
		minCard: Int
		maxCard: Int
		questions: [SDCQuestion]
		subSectionIDs: [String]
		superSectionID: String
		arbitraryProperties: [ArbitraryProperty]
	}
	type SDCForm {
		id: String
		docType: String
		procedureID: String
		patientID: String
		lineage: String
		title:String
		uri: String
		sectionIDs: [String]
		footer: String
		xml: String
		lastModified: String
		previousVersion: String
		arbitraryProperties: [ArbitraryProperty]
	}
	type User {
		id: String
		password: String
		permissions: [String]
	}
	
	input SDCQuestionInput {
		id: String
		docType: String
		name: String
		title: String
		mustImplement: Boolean
		readOnly: Boolean
		minCard: Int
		maxCard: Int
		maxSelections: Int
		questionType: String
		isEnabled: Boolean
		textAfterResponse: String
		subQuestions: [SDCQuestionInput]
		superSectionID: String
		superQuestionID: String
		superAnswerID: String
	}	
	input SDCSectionInput {
		id: String
		docType: String
		name: String
		title: String
		type: String
		mustImplement: Boolean
		minCard: Int
		maxCard: Int
		questions: [SDCQuestionInput]
		superSectionID: String
	}
	input FormInput {
		id: String
		docType: String
		procedureID: String
		patientID: String
		lineage: String
		title:String
		uri: String
		sectionIDs: [String]
		footer: String
        lastModified: String
	}
	input FormXMLInput {
		id: String
		xml: String
	}
	input SDCQuestionResponseInput {
		id: String
		questionID: String
		userInput: InputType
	}
	input SDCFormResponseInput {
		id: String
		docType: String
		formID: String
		formFillerID: String
		patientID: String
		responses: [SDCQuestionResponseInput]
	}

	union SDCFormObjects = SDCForm | SDCSection | SDCQuestion
	union SDCSectionObjects = SDCSection | SDCQuestion

	type Query {
		forms(limit: Int, skip: Int, id: String): [SDCForm]
		form(id:String): [SDCFormObjects]
		question(id:String): [SDCQuestion]
		section(id:String): [SDCSectionObjects]
		user(id: String, password: String): User
	}
	type Mutation {
		updateForm(id: String, input: FormInput): SDCForm
		uploadForm(id: String, input: FormXMLInput): SDCForm
		updateQuestion(id: String, input: SDCQuestionInput): SDCQuestion
		updateSection(id: String, input: SDCSectionInput): SDCSection
		deleteForm(id: String): SDCForm
		updateRes(id: String, input:UserResponse): SDCForm
		registerUser(id: String, password: String, permissions: [String]): User
	}
`);
exports.resolveType = (obj, context, info) => {
    if (obj.docType) {
        return obj.docType;
    }
    else if (obj.responseType && obj.responseType.includes("single choice"))
        return "SDCMultipleChoiceResponse";
    else if (obj.responseType === "text")
        return "SDCTextResponse";
    else if (obj.responseType === "date")
        return "SDCDateResponse";
    else if (obj.responseType === "number")
        return "SDCIntResponse";
    else {
        return null;
    }
};
//# sourceMappingURL=schema.js.map