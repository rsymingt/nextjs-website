import { NextApiRequest } from 'next';

// import * as postController from '../../controllers/post';

export default async function handle(
  req: NextApiRequest,
  // _res: NextApiResponse<void | Post[]>
) {
  switch (req.method) {
    case 'GET':
      // postController.list();
      break;
    case 'POST':
      // postController.create();
      break;
  }
}
