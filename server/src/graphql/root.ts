import { database } from '../database';

// graphql root
export const root = {
	forms: async(
		{ limit, skip, id }: { limit: number, skip: number | undefined, id: string | undefined },
		context: any
	) => {
		try {
			const forms: any = await database.getAllForms(context, limit, skip, id);
			return forms;
		} catch (error) {
			console.error('get form error:', error);
			throw error;
		}
	},
	form: async({ id }: { id: string }, context: any) => {
		try {
			const form: any = await database.getForm(id, context);
			form[0].id = id;
			return form;
		} catch (error) {
			console.error('get form error:', error);
			throw error;
		}
	},
	question: async({ id }: { id: string }, context: any) => {
		try {
			const question: any = await database.getQuestion(id, context);
			question[0].id = id;
			return question;
		} catch (error) {
			console.error('get question error:', error);
			throw error;
		}
	},
	section: async({ id }: { id: string }, context: any) => {
		try {
			const section: any = await database.getSection(id, context);
			section[0].id = id;
			return section;
		} catch (error) {
			console.error('get section error:', error);
			throw error;
		}
	},
	user: async({ id, password }: { id: string, password:string }, context: any) => {
		try {
			const user = await database.getUser(id, password, context);
			return user;
		} catch (error) {
			console.error('get user error:', error);
			throw error;
		}
	},
	updateForm: async({ id, input }: { id: string, input: any }, context: any) => {
		try {
			await database.updateForm(id, input, context);
			return await root.form({ id }, context);
			// keeping this for later
			// input.id = id;
		} catch (error) {
			console.error('update form error:', error);
			throw error;
		}
	},
	updateRes: async({ id, input }: { id: string, input: any }, context: any) => {
		try {
			await database.updateForm(id, input, context);
			return await root.form({ id }, context);
			// keeping this for later
			// input.id = id;
		} catch (error) {
			console.error('update form error:', error);
			throw error;
		}
	},
	uploadForm: async({ id, input }: { id: string, input: any }, context: any) => {
		try {
			await database.uploadForm(id, input, context);
			return await root.form({ id }, context);
			// keeping this for later
			// input.id = id;
		} catch (error) {
			console.error('upload form error:', error);
			throw error;
		}
	},
	updateQuestion: async({ id, input }: { id: string, input: any }, context: any) => {
		try {
			await database.updateQuestion(id, input, context);
			return await root.question({ id }, context);
			// keeping this for later
			// input.id = id;
		} catch (error) {
			console.error('update question error:', error);
			throw error;
		}
	},
	updateSection: async({ id, input }: { id: string, input: any }, context: any) => {
		try {
			await database.updateSection(id, input, context);
			return await root.section({ id }, context);
			// keeping this for later
			// input.id = id;
		} catch (error) {
			console.error('update section error:', error);
			throw error;
		}
	},
	deleteForm: async({ id }: {id: string}, context: any) => {
		try {
			return await database.deleteForm(id, context);
		} catch (error) {
			console.error('delete form error:', error);
			throw error;
		}
	},
	updateUser: async({ id, user }: { id: string, user: any }, context: any) => {
		try {
			return await database.updateUser(id, user, context);
		} catch (error) {
			console.error('update user error:', error);
			throw error;
		}
	},
	registerUser: async(user: any) => {
		try {
			await database.registerUser(user);
			return user;
		} catch (error) {
			console.error('register user error:', error);
			throw error;
		}
	}
};
