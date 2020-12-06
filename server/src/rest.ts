import express from 'express';
// import { Buffer } from 'buffer';
// import { graphql } from 'graphql';
// import fetch, { Response } from 'node-fetch';

// import { root, schema } from './graphql';

export const router = express.Router();

router.get('/', (req: any, res: any) => {
	res.json({ form: '/form/{id}' });
});
