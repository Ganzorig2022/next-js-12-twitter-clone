import type { NextApiRequest, NextApiResponse } from 'next';
import { initMongoose } from '../../lib/mongoose';

// type Data = {
//   id: string;
// };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  initMongoose();

  const id = req.query.id;

  res.status(200).json({ id });
}
