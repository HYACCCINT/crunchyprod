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
Object.defineProperty(exports, "__esModule", { value: true });
exports.root = void 0;
const database_1 = require("../database");
// graphql root
exports.root = {
    forms: ({ limit, skip, id }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const forms = yield database_1.database.getAllForms(context, limit, skip, id);
            return forms;
        }
        catch (error) {
            console.error('get form error:', error);
            throw error;
        }
    }),
    form: ({ id }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const form = yield database_1.database.getForm(id, context);
            form[0].id = id;
            return form;
        }
        catch (error) {
            console.error('get form error:', error);
            throw error;
        }
    }),
    question: ({ id }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const question = yield database_1.database.getQuestion(id, context);
            question[0].id = id;
            return question;
        }
        catch (error) {
            console.error('get question error:', error);
            throw error;
        }
    }),
    section: ({ id }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const section = yield database_1.database.getSection(id, context);
            section[0].id = id;
            return section;
        }
        catch (error) {
            console.error('get section error:', error);
            throw error;
        }
    }),
    user: ({ id, password }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield database_1.database.getUser(id, password, context);
            return user;
        }
        catch (error) {
            console.error('get user error:', error);
            throw error;
        }
    }),
    updateForm: ({ id, input }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield database_1.database.updateForm(id, input, context);
            return yield exports.root.form({ id }, context);
            // keeping this for later
            // input.id = id;
        }
        catch (error) {
            console.error('update form error:', error);
            throw error;
        }
    }),
    updateRes: ({ id, input }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield database_1.database.updateForm(id, input, context);
            return yield exports.root.form({ id }, context);
            // keeping this for later
            // input.id = id;
        }
        catch (error) {
            console.error('update form error:', error);
            throw error;
        }
    }),
    uploadForm: ({ id, input }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield database_1.database.uploadForm(id, input, context);
            return yield exports.root.form({ id }, context);
            // keeping this for later
            // input.id = id;
        }
        catch (error) {
            console.error('upload form error:', error);
            throw error;
        }
    }),
    updateQuestion: ({ id, input }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield database_1.database.updateQuestion(id, input, context);
            return yield exports.root.question({ id }, context);
            // keeping this for later
            // input.id = id;
        }
        catch (error) {
            console.error('update question error:', error);
            throw error;
        }
    }),
    updateSection: ({ id, input }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield database_1.database.updateSection(id, input, context);
            return yield exports.root.section({ id }, context);
            // keeping this for later
            // input.id = id;
        }
        catch (error) {
            console.error('update section error:', error);
            throw error;
        }
    }),
    deleteForm: ({ id }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield database_1.database.deleteForm(id, context);
        }
        catch (error) {
            console.error('delete form error:', error);
            throw error;
        }
    }),
    updateUser: ({ id, user }, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield database_1.database.updateUser(id, user, context);
        }
        catch (error) {
            console.error('update user error:', error);
            throw error;
        }
    }),
    registerUser: (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield database_1.database.registerUser(user);
            return user;
        }
        catch (error) {
            console.error('register user error:', error);
            throw error;
        }
    })
};
//# sourceMappingURL=root.js.map