import { NextApiRequest, NextApiResponse } from 'next';
import httpStatus from 'http-status';

import * as authController from '../../controllers/auth-controller';

export interface AuthRequest extends NextApiRequest {
  body: {
    username: string;
    password: string;
  };
}

export default async function (req: AuthRequest, res: NextApiResponse<void>) {
  switch (req.method) {
    case 'POST':
      await authController.auth(req, res);
      break;
    default:
      res.status(httpStatus.METHOD_NOT_ALLOWED).send();
  }
}
