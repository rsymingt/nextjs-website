
import { NextApiRequest, NextApiResponse } from "next";

import * as postController from '../../controllers/post';

export default async function( req: NextApiRequest, res: NextApiResponse<void> ) {
    switch(req.method) {
        case 'GET':
            postController.list();
            break;
        case 'POST':
            postController.create();
            break;
    }
}