import Post from '../post';

const postData = {
  name: 'Ryan',
};

describe('post model', () => {
  let post: Post;
  const { name } = postData;

  beforeAll(async () => {
    post = await Post.query().insert(postData);
    console.log('test');
  });

  it('should have a name', () => {
    expect(post.name).toBe(name);
  });
});
