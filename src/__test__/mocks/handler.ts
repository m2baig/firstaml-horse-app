import { rest } from 'msw';
import { responseData } from './response-data';

export const handlers = [
  rest.get('http://localhost:3016/horse', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([...responseData]));
  }),
  rest.get('http://localhost:3016/horse/90740010-ee4e-418c-8de4-4c4a5a2817aa', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ ...responseData[0] }));
  }),
];
