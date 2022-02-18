import { NextApiRequest, NextApiResponse } from 'next';
import httpStatus from 'http-status';

import * as authController from '../../controllers/auth-controller';

export interface AuthRequest extends NextApiRequest {
  body: {
    username: string;
    password: string;
  };
}

export default function (req: AuthRequest, res: NextApiResponse<void>) {
  switch (req.method) {
    case 'POST':
      const authorized = authController.auth(req, res);
      if (authorized) {
        res.status(httpStatus.OK).send(); // send access token for re-auth
      }
      break;
    default:
      res.status(httpStatus.METHOD_NOT_ALLOWED).send();
  }
  res.status(httpStatus.UNAUTHORIZED).send();
}
