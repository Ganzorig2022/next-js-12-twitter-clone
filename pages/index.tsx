import axios from 'axios';
import { useEffect, useState } from 'react';
import PostContent from '../components/PostContent';
import PostForm from '../components/PostForm';
import UserNameForm from '../components/UserNameForm';
import useUserInfo from '../hooks/useUserInfo';

type Posts = {
  author: Author;
  text: string;
  __v: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type Post = {};

const Home = () => {
  const { userInfo, status: userInfoStatus } = useUserInfo();
  const [posts, setPosts] = useState<Posts[]>([]);

  const fetchPosts = async () => {
    const posts = await axios.get('/api/posts');
    setPosts(posts.data);
  };

  //when home page renders first time, then fetch posts from mongoDB
  useEffect(() => {
    fetchPosts();
  }, []);

  if (userInfoStatus === 'loading') {
    return 'Loading User Info...';
  }

  //if logged user has no username, then go to pick new username form component
  if (!userInfo?.username) {
    return <UserNameForm />;
  }

  return (
    <div className='max-w-lg mx-auto border-b border-r border-twitterBorder min-h-screen'>
      <h1 className='tet-xl font-bold p-4'>Home</h1>
      {/* Create a Post */}
      <PostForm onPost={fetchPosts} />

      {/* All Posts */}
      <div className=''>
        {posts.length > 0 &&
          posts?.map((post) => (
            <div className='border-t border-twitterBorder p-5' key={post._id}>
              <PostContent {...post} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
