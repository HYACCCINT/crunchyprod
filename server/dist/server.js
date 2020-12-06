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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("./graphql");
const rest_1 = require("./rest");
const cors_1 = __importDefault(require("cors"));
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fillerUser = {
    id: 'guest',
    docType: 'user',
    permissions: ['fill']
};
const managerUser = {
    id: 'guest',
    docType: 'user',
    permissions: ['manage']
};
const app = express_1.default();
const port = process.env.PORT || 5000;
// Setup express application to use express-session middleware
// Must be configured with proper session storage for production
// environments. See https://github.com/expressjs/session for
// additional documentation
app.use(session({
    secret: '123456',
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 86400000 }
}));
// cors temp
app.use(cors_1.default());
app.use(cors_1.default({
    credentials: true,
    //to be changed in production
    origin: 'http://localhost:3000'
}));
app.use(cookieParser());
const path = require('path');
const staticFiles = express_1.default.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);
/**
 * If guest user is logged in, here is where it becomes an object on req.
 */
app.use('*', (req, res, next) => {
    req.session.reload(function (err) {
    });
    next();
});
//db api
app.use(body_parser_1.default.json({ limit: '1mb' }));
app.use('/graphql', cors_1.default(), express_graphql_1.graphqlHTTP({
    schema: graphql_1.schema,
    typeResolver: graphql_1.resolveType,
    rootValue: graphql_1.root,
    graphiql: true
}));
app.use('/', rest_1.router);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(body_parser_1.default.urlencoded({ extended: true }));
function checkAuthentication(req, res, next) {
    try {
        next();
    }
    catch (error) {
        res.status('401').json({ error: 'unauthorized' });
    }
}
app.get('/api/filler-guest-login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.user = fillerUser;
    res.json({ user: fillerUser, url: '/fill' });
    req.session.save();
}));
app.get('/api/manager-guest-login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.user = managerUser;
    res.json({ user: managerUser, url: '/manage' });
    req.session.save();
}));
app.get('/api/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield graphql_1.root.user({ id: req.id, password: req.password }, req);
        res.json(user);
        req.session.save();
    }
    catch (error) {
        res.status('404').json({ error: 'User not found' });
    }
}));
app.get('/api/cur-user', checkAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(req.session.user);
        req.session.save();
    }
    catch (error) {
        res.status('404').json({ error: 'User not found' });
    }
}));
app.get('/apitest/form', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const form = yield graphql_1.root.form({ id: req.body.id }, req);
        res.json(form);
    }
    catch (error) {
        res.status('404').json({ error: 'form not found' });
    }
}));
app.post('/api/form', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const form = yield graphql_1.root.updateForm({ id: req.body.id, input: req.body.input }, req);
        res.json(form);
    }
    catch (error) {
        res.status('404').json({ error: 'form not found' });
    }
}));
app.post('/api/upload/form', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const form = yield graphql_1.root.uploadForm({ id: req.body.id, input: req.body.input }, req);
        res.json(form);
    }
    catch (error) {
        res.status('404').json({ error: 'form not found' });
    }
}));
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
exports.default = server;
//# sourceMappingURL=server.js.map