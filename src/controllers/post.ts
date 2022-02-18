import httpStatus from 'http-status';
import { NextApiRequest, NextApiResponse } from 'next';
import PostModel from '../models/post';

export async function create(req: { body: Post }, res: NextApiResponse<void>) {
  const post: Post = req.body;

  await PostModel.query().insert(post);

  res.status(httpStatus.CREATED).send();
}

export async function list(req: NextApiRequest, res: NextApiResponse<Post[]>) {
  const posts = await PostModel.query();

  res.status(httpStatus.OK).json(posts);
}
