import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { initMongoose } from '../../lib/mongoose';
import Follower from '../../models/Follower';
import User from '../../models/User';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //1) Connecting to MongoDB
  await initMongoose();

  //2) Getting logged userId
  const session = await unstable_getServerSession(req, res, authOptions);
  const userId = session?.user.id;

  //Get USER DATA from mongoDB
  if (req.method === 'GET') {
    const { id, username } = req.query;

    //1) Getting user data depends on "userId" or "username"
    const user = id
      ? await User.findById(id)
      : await User.findOne({ username });

    //2) Getting user following data
    const follow = await Follower.findOne({
      source: userId,
      destination: user._id,
    });

    //3) Returning response
    res.status(200).json({ user, follow });
  }

  //Update USERNAME to mongoDB
  if (req.method === 'PUT') {
    const { username } = req.body;

    await User.findByIdAndUpdate(userId, { username });
    res.status(200).json('ok');
  }
}

// infine loop below
// const user = await User.findOne({ id, username });
