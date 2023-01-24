import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { initMongoose } from '../../lib/mongoose';
import Follower from '../../models/Follower';
import Like from '../../models/Like';
import Post from '../../models/Post';
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

  //Getting Tweet Text from mongoDB
  if (req.method === 'GET') {
    const { id } = req.query;

    if (id) {
      // Getting **SINGLE** post
      const post = await Post.findById(id).populate('author');
      res.json(post);
    }
    // Getting **ALL** posts
    else {
      const parent = req.query.parent || null;
      const author = req.query.author;

      let searchFilter: any;

      //1) For home page
      if (!author && !parent) {
        const myFollows = await Follower.find({
          source: userId,
        }).exec();

        const idsOfPeopleIFollow = myFollows.map((f) => f.destination);
        searchFilter = { author: [...idsOfPeopleIFollow, userId] };
      }

      //2) For user PROFILE page
      // if author has id, then filter posts with "author" field.
      if (author) {
        searchFilter = { author };
      }

      //3) For someone's POST page
      // if parent has id, then filter posts with "parent" field.
      if (parent) {
        searchFilter = { parent };
      }

      const posts = await Post.find(searchFilter)
        .populate('author') // "/models/Post.ts" dotor "author" dotor "ref:'User" gej ogson uchraas 2 collection hoorondoo holbogdson. Populate()-eer "User"-iin "email, pass, image, name" geh met data orj irne.
        .sort({ createdAt: -1 })
        .limit(20) //descending order
        .exec();

      //Getting all liked posts[]
      const postLikedByMe = await Like.find({
        author: session?.user.id,
        post: posts.map((post) => post._id),
      });

      //Getting posts which was liked by me[]
      let idsLikedByMe = postLikedByMe.map((like) => like.post);

      //4) Returning response
      res.json({ posts, idsLikedByMe });
    }
  }

  //Save new post to mongoDB
  if (req.method === 'POST') {
    const { text, parent } = req.body;

    const post = await Post.create({ author: session?.user.id, text, parent });

    // check if how many comments are counted on specific post, then save it to mongoDB
    if (parent) {
      //
      const parentPost = await Post.findById(parent);
      // Counting how many comments
      parentPost.commentsCount = await Post.countDocuments({ parent });
      await parentPost.save();
    }
    res.status(200).json(post);
  }
}

// 2:51 dr duusaw
