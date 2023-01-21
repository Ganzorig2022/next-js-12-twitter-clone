import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { initMongoose } from '../../lib/mongoose';
import Post from '../../models/Post';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await initMongoose();

  const session = await unstable_getServerSession(req, res, authOptions);

  //Save Tweet Text to mongoDB
  if (req.method === 'POST') {
    const { text } = req.body;

    const newPost = await Post.create({ author: session?.user.id, text });

    res.status(200).json(newPost);
  }

  //Getting Tweet Text from mongoDB
  if (req.method === 'GET') {
    const posts = await Post.find()
      .populate('author') // "/models/Post.ts" dotor "author" dotor "ref:'User" gej ogson uchraas 2 collection hoorondoo holbogdson. Populate()-eer "User"-iin "email, pass, image, name" geh met data orj irne.
      .sort({ createdAt: -1 })
      .exec(); //sort(-1) sorting posts by descending order
    res.json(posts);
  }
}
