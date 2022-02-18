import { NextApiResponse } from 'next';

import { AuthRequest } from '../pages/api/auth';
import dotenv from 'dotenv';
import httpStatus from 'http-status';

dotenv.config();

const { ADMIN_USER, ADMIN_PASSWORD } = process.env;

export async function auth(req: AuthRequest, res: NextApiResponse<void>) {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
    // set session
    res.status(httpStatus.OK).send(); // send access token for re-auth
  }

  res.status(httpStatus.UNAUTHORIZED);
}
