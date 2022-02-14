import Post from '../models/Post';

export async function create(post: Post) {
  await Post.query().insert(post);

  return true;
}

export async function list() {
  return await Post.query();
}
