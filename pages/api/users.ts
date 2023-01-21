import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { initMongoose } from '../../lib/mongoose';
import User from '../../models/User';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await initMongoose();

  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: 'You must be logged in.' });
    return;
  }

  //Update USERNAME to mongoDB
  if (req.method === 'PUT') {
    const { username } = req.body;

    await User.findByIdAndUpdate(session?.user.id, { username });
    res.status(200).json('ok');
  }

  //Get USER DATA from mongoDB
  if (req.method === 'GET') {
    const id = req.query.id;
    const user = await User.findById(id);

    res.status(200).json({ user });
  }
}
