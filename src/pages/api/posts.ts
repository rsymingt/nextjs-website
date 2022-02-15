import httpStatus from 'http-status';
import { NextApiRequest, NextApiResponse } from 'next';

import * as postController from '../../controllers/post';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<void | Post[]>
) {
  try {
    switch (req.method) {
      case 'GET':
        await postController.list(req, res);
        break;
      case 'POST':
        await postController.create(req, res);
        break;
    }
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }
}
