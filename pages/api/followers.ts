import type { NextApiRequest, NextApiResponse } from 'next';
import { initMongoose } from '../../lib/mongoose';
import { authOptions } from './auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';
import User from '../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //1) Connecting to MongoDB
  await initMongoose();

  //2) Getting request body
  const { bio, username, name } = req.body;

  //3) Getting LOGGED userId
  const session = await unstable_getServerSession(req, res, authOptions);
  const userId = session?.user.id;

  //4) Find and Update USER database
  await User.findByIdAndUpdate(userId, { bio, username, name });

  //5) Returning response data
  res.status(200).json('ok');
}
