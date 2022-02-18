import { NextApiResponse } from 'next';

import { AuthRequest } from '../pages/api/auth';
import dotenv from 'dotenv';

dotenv.config();

const { ADMIN_USER, ADMIN_PASSWORD } = process.env;

export function auth(req: AuthRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
    return true;
  }

  return false;
}
