import httpStatus from 'http-status';
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';
import PostModel from '../../models/post';

import * as postController from '../post';

const postData = {
  name: 'test',
};

describe('post create', () => {
  const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
    method: 'GET',
    body: postData,
  });

  it('should create post', async () => {
    await postController.create(req, res);
    expect(res._getStatusCode()).toBe(httpStatus.CREATED);
  });
});

describe('post list', () => {
  const postSchema = PostModel.jsonSchema;
  const { req, res } = createMocks<NextApiRequest, NextApiResponse<Post[]>>({
    method: 'GET',
    body: postData,
  });

  it('should receive list of posts', async () => {
    await postController.list(req, res);
    const data = res._getJSONData();

    expect(res._getStatusCode()).toBe(httpStatus.OK);
    expect(Array.isArray(data)).toBe(true);
    data.forEach((post: Post) => {
      postSchema.required.forEach((property) => {
        expect(post).toHaveProperty(property);
      });
    });
  });
});
