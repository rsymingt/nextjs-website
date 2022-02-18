import { NextApiRequest, NextApiResponse } from 'next';

import dotenv from 'dotenv';
dotenv.config();

const { ADMIN_USER, ADMIN_PASSWORD } = process.env;

export default function (req: NextApiRequest, res: NextApiResponse<void>) {}
