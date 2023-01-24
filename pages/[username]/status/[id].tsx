import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useUserInfo from '../../../hooks/useUserInfo';
import Layout from '../../../components/Layout';
import PostContent from '../../../components/PostContent';
import PostForm from '../../../components/PostForm';
import TopNavLink from '../../../components/TopNavLink';

type Post = {
  author: Author;
  text: string;
  __v: number;
  _id: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
};

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { userInfo } = useUserInfo();
  const [post, setPost] = useState<Post>();
  const [repliedPosts, setRepliedPosts] = useState<Post[]>([]);
  const [repliesLikedByMe, setRepliesLikedByMe] = useState<string[]>([]);

  const fetchData = () => {
    //1) GETting INITAL post ("/components/PostContent.tsx") when click the one of the posts.
    axios.get(`/api/posts?id=${id}`).then((res) => {
      setPost(res.data);
    });
    //2) GETting REPLIED post
    axios.get(`/api/posts?parent=${id}`).then((res) => {
      setRepliedPosts(res.data.posts);
      setRepliesLikedByMe(res.data.idsLikedByMe);
    });
  };

  // Requesting for getting post data from mongoDB
  useEffect(() => {
    if (!id) {
      return;
    }
    fetchData();
  }, [id]);

  return (
    <Layout>
      {/* INITIAL POST here */}
      {!!post?._id && (
        <div className='px-5 py-2'>
          <TopNavLink />
          <PostContent {...post} big={true} likedByMe={true} />
        </div>
      )}
      {!!userInfo && (
        <div className='border-t border-twitterBorder py-5 '>
          <PostForm
            onPost={fetchData}
            parent={id}
            compact
            placeholder='Tweet your reply'
          />
        </div>
      )}

      {/* REPLIED POST here */}
      <div className=''>
        {repliedPosts.length > 0 &&
          repliedPosts.map((repliedPost) => (
            <div
              key={repliedPost._id}
              className='p-5 border-t border-twitterBorder'
            >
              <PostContent
                {...repliedPost}
                big={false}
                likedByMe={repliesLikedByMe.includes(repliedPost._id)}
              />
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default PostPage;
