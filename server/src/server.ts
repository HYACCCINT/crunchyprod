import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { root, schema, resolveType } from './graphql';
import { router } from './rest';
import cors from 'cors';
const session = require('express-session');
const cookieParser = require('cookie-parser');

const fillerUser = {
	id: 'guest',
	docType: 'user',
	permissions:['fill']
};
const managerUser = {
	id: 'guest',
	docType: 'user',
	permissions:['manage']
};

const app = express();
const port = process.env.PORT || 5000;

// Setup express application to use express-session middleware
// Must be configured with proper session storage for production
// environments. See https://github.com/expressjs/session for
// additional documentation
app.use(session({
	secret: '123456',
	resave: true,
	saveUninitialized: false,
	cookie: { secure: false , maxAge: 86400000}
}));

// cors temp
app.use(cors())
app.use(cors({
  credentials: true,
  //to be changed in production
	origin: 'http://localhost:3000'
}))

app.use(cookieParser());



/**
 * If guest user is logged in, here is where it becomes an object on req.
 */
app.use('*', (req: any, res: any, next: any) => {
	req.session.reload(function(err:any) {
	})
	next();
});

//db api
app.use(bodyParser.json({ limit: '1mb' }));
app.use('/graphql',cors(), graphqlHTTP({
	schema,
	typeResolver: resolveType,
	rootValue: root,
	graphiql: true
}));
app.use('/', router);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
function checkAuthentication(req: any, res: any, next: any) {
try {
		next();
	} catch (error){
		res.status('401').json({ error: 'unauthorized' });
	}
}
app.get('/api/filler-guest-login', async(req: any, res: any) => {
	req.session.user = fillerUser;
	res.json({user: fillerUser, url:'/fill'})
	req.session.save();
});
app.get('/api/manager-guest-login', async(req: any, res: any) => {
	req.session.user = managerUser;
	res.json({user: managerUser, url:'/manage'})
	req.session.save();
});

app.get('/api/user', async(req: any, res: any) => {
	try {
		const user = await root.user({ id: req.id, password: req.password}, req);
		res.json(user);
		req.session.save();
	} catch (error) {
		res.status('404').json({ error: 'User not found' });
	}
});

app.get('/api/cur-user', checkAuthentication, async(req: any, res: any) => {
	try {
		res.json(req.session.user);
		req.session.save();
	} catch (error) {
		res.status('404').json({ error: 'User not found' });
	}
});

app.get('/apitest/form', async(req: any, res: any) => {
	try {
    const form = await root.form({ id: req.body.id }, req);
    res.json(form)
	} catch (error) {
		res.status('404').json({ error: 'form not found' });
	}
});

app.post('/api/form', async(req: any, res: any) => {
	try {
		const form = await root.updateForm({ id: req.body.id, input:req.body.input }, req);
    res.json(form);
	} catch (error) {
		res.status('404').json({ error: 'form not found' });
	}
});

app.post('/api/upload/form', async(req: any, res: any) => {
	try {
		const form = await root.uploadForm({ id: req.body.id, input:req.body.input }, req);
    res.json(form);
	} catch (error) {
		res.status('404').json({ error: 'form not found' });
	}
});

const server = app.listen(port, () => console.log(`Listening on port ${port}`));
export default server;
