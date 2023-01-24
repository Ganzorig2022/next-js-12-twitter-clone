import type { NextApiRequest, NextApiResponse } from 'next';
import { initMongoose } from '../../lib/mongoose';
import { authOptions } from './auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';
import Follower from '../../models/Follower';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //1) Connecting to MongoDB
  await initMongoose();

  //2) Getting request body
  const { destination } = req.body;

  //3) Getting LOGGED userId
  const session = await unstable_getServerSession(req, res, authOptions);
  const userId = session?.user.id;

  //4) Find someone who's already following someone
  const existingFollow = await Follower.findOne({
    destination,
    source: userId,
  });

  //5) Then decide whether save it or remove it
  if (existingFollow) {
    await existingFollow.remove();
    res.json(null);
  } else {
    const data = await Follower.create({ destination, source: userId });
    //6) Returning response data
    res.status(200).json(data);
  }
}
