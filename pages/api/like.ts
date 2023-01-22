import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { initMongoose } from '../../lib/mongoose';
import Like from '../../models/Like';
import Post from '../../models/Post';
import { authOptions } from './auth/[...nextauth]';

const updateLikesCount = async (postId: string) => {
  const post: any = await Post.findById(postId);
  post.likesCount = await Like.countDocuments({ post: postId });
  await post.save();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await initMongoose();

  const session = await unstable_getServerSession(req, res, authOptions);

  //CRUD operation of Like in mongoDB
  if (req.method === 'POST') {
    //1) Getting userId and postId from request from front-end side
    const postId = req.body.id;
    const userId = session?.user.id;
    //2) Find the like record by using author and postId
    const existingLike = await Like.findOne({ author: userId, post: postId });

    if (existingLike) {
      //if user already liked post, then remove it
      await existingLike.remove();
      await updateLikesCount(postId);
      res.json(null);
    } else {
      //if user's not liked yet, then create new Like data
      const like = await Like.create({ author: userId, post: postId });
      await updateLikesCount(postId);
      res.status(200).json(like);
    }
  }
}
