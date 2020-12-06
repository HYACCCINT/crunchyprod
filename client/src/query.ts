import { createClient, CombinedError } from 'urql';

export const allFormQuery = `
{
	forms {
        id,
        docType,
        procedureID,
        patientID,
        lineage,
        title,
        lastModified
	}
}
`;

export const formQuery = `
query($id: String!) {
	form(id: $id) {
		... on SDCForm {
			id,
			docType,
			procedureID,
			patientID,
			lineage,
			title,
			sectionIDs,
			uri,
			footer,
			lastModified,
			arbitraryProperties,
		}
		... on SDCSection {
			id,
			docType,
			name,
			title,
			type,
			mustImplement,
			minCard,
			maxCard,
			subSectionIDs,
			superSectionID,
			arbitraryProperties,
		}
		... on SDCQuestion {
			id,
			docType,
			name,
			title,
			mustImplement,
			readOnly,
			minCard,
			maxCard,
			maxSelections,
			questionType,
			isEnabled,
			response {
				id,
				questionID,
				responseType,
				arbitraryProperties,
				... on SDCMultipleChoiceResponse {
					choices,
					canMultiSelect,
					userInput: userInput,
				}
				... on SDCIntResponse {
					userInput: userInput,
					defaultNum: defaultValue,
				}
				... on SDCTextResponse {
					userInput: userInput,
					defaultText: defaultValue,
				}
				... on SDCDateResponse {
					userInput: userInput,
					defaultDate: defaultValue,
				}
			},
			textAfterResponse,
			superSectionID,
			superQuestionID,
			superAnswerID,
			arbitraryProperties,
		}
	}
}
`;
export const userQuery = `
query($id: String, $password: String) {
	user(id: $id, password: $password) {
		id,
		password,
		permissions
	}
}`
export const questionQuery = `
query($id: String!) {
	question(id: $id) {
		id,
		docType,
		name,
		title,
		mustImplement,
		readOnly,
		minCard,
		maxCard,
		maxSelections,
		questionType,
		isEnabled,
		response {
			id,
			questionID,
			responseType,
			arbitraryProperties,
			... on SDCMultipleChoiceResponse {
				choices,
				canMultiSelect,
				userInput: userInput,
			}
			... on SDCIntResponse {
				inputNum: userInput,
				defaultNum: defaultValue,
				userInput: userInput,
			}
			... on SDCTextResponse {
				inputText: userInput,
				defaultText: defaultValue,
				userInput: userInput,
			}
		},
		textAfterResponse,
		superSectionID,
		superQuestionID,
		superAnswerID,
		arbitraryProperties,
	}
}
`;

export const sectionQuery = `
query($id: String!) {
	section(id: $id) {
		... on SDCSection {
			id,
			docType,
			name,
			title,
			type,
			mustImplement,
			minCard,
			maxCard,
			subSectionIDs,
			superSectionID,
			arbitraryProperties,
		}
		... on SDCQuestion {
			id,
			docType,
			name,
			title,
			mustImplement,
			readOnly,
			minCard,
			maxCard,
			maxSelections,
			questionType,
			isEnabled,
			response {
				id,
				questionID,
				responseType,
				arbitraryProperties,
				... on SDCMultipleChoiceResponse {
					choices,
					canMultiSelect,
					userInput: userInput,
				}
				... on SDCIntResponse {
					userInput: userInput,
					defaultNum: defaultValue,
				}
				... on SDCTextResponse {
					userInput: userInput,
					defaultText: defaultValue,
				}
			},
			textAfterResponse,
			superSectionID,
			superQuestionID,
			superAnswerID,
			arbitraryProperties,
		}
	}
}
`;

export const deleteFormQuery = `
mutation($id: String) {
	deleteForm(id: $id) {
		id
	}
}
`;

export const updateFormQuery = `
mutation($id: String, $input: FormInput) {
	updateForm(id: $id, input: $input) {
		id,
		docType,
		procedureID,
		patientID,
		lineage,
		title,
		sections,
		uri,
		footer,
		lastModified,
		arbitraryProperties,
	}
}
`;
export const updateResQuery = `
mutation($id: String, $input: UserResponse) {
	updateRes(id: $id, input: $input) {
		id
	}
}
`;

export const uploadFormQuery = `
mutation($id: String, $input: FormXMLInput) {
	uploadForm(id: $id, input: $input) {
		id,
		xml
	}
}
`;

export const updateQuestionQuery = `
mutation($id: String, $input: SDCQuestionInput) {
	updateQuestion(id: $id, input: $input) {
		id,
		docType,
		name,
		title,
		mustImplement,
		readOnly,
		minCard,
		maxCard,
		maxSelections,
		questionType,
		isEnabled,
		textAfterResponse,
		superQuestionID,
		subQuestions,
		arbitraryProperties,
	}
}
`;

export const updateSectionQuery = `
mutation($id: String, $input: SDCSectionInput) {
	updateSection(id: $id, input: $input) {
		id,
		docType,
		name,
		title,
		type,
		mustImplement,
		minCard,
		maxCard,
		questions {
			id,
			docType,
			name,
			title,
			mustImplement,
			readOnly,
			minCard,
			maxCard,
			maxSelections,
			questionType,
			isEnabled,
			textAfterResponse,
			superQuestionID,
			subQuestions
		},
		subSections,
		arbitraryProperties,
	}
}
`;

export const urqlClient = createClient({
	url: `http://localhost:5000/graphql`
});

export const handleUrqlError = (error: CombinedError | undefined) => {
	if (error) {
		for (const { message } of error.graphQLErrors) {
			throw new Error(message);
		}
	}
};
