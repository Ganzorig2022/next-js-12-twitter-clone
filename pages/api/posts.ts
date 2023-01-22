import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { initMongoose } from '../../lib/mongoose';
import Like from '../../models/Like';
import Post from '../../models/Post';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await initMongoose();

  const session = await unstable_getServerSession(req, res, authOptions);

  //Getting Tweet Text from mongoDB
  if (req.method === 'GET') {
    const { id } = req.query;

    if (id) {
      // getting SINGLE post
      const post = await Post.findById(id).populate('author');
      res.json(post);
    } else {
      const parent = req.query.parent || null;
      // getting all post data for HOME page
      const posts = await Post.find({ parent })
        .populate('author') // "/models/Post.ts" dotor "author" dotor "ref:'User" gej ogson uchraas 2 collection hoorondoo holbogdson. Populate()-eer "User"-iin "email, pass, image, name" geh met data orj irne.
        .limit(20)
        .sort({ createdAt: -1 }) //descending order
        .exec();

      const postLikedByMe = await Like.find({
        author: session?.user.id,
        post: posts.map((post) => post._id),
      });

      const idsLikedByMe = postLikedByMe.map((like) => like.post);

      res.json({ posts, idsLikedByMe });
    }
  }

  //Save Tweet Text (post) to mongoDB
  if (req.method === 'POST') {
    const { text, parent } = req.body;

    const post = await Post.create({ author: session?.user.id, text, parent });

    res.status(200).json(post);
  }
}
