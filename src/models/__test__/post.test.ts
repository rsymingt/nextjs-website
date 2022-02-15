import PostModel from '../post';

const postData: Post = {
  name: 'Ryan',
};

describe('post model', () => {
  let post: Post;
  const { name } = postData;

  beforeAll(async () => {
    post = await PostModel.query().insert(postData);
  });

  it('should have a name', () => {
    expect(post.name).toBe(name);
  });
});
