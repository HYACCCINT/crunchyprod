"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
// import { Buffer } from 'buffer';
// import { graphql } from 'graphql';
// import fetch, { Response } from 'node-fetch';
// import { root, schema } from './graphql';
exports.router = express_1.default.Router();
exports.router.get('/', (req, res) => {
    res.json({ form: '/form/{id}' });
});
//# sourceMappingURL=rest.js.map