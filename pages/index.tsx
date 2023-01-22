import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
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
  likesCount: number;
};

const Home = () => {
  const router = useRouter();
  const { userInfo, setUserInfo, status: userInfoStatus } = useUserInfo();
  const [posts, setPosts] = useState<Posts[]>([]);
  const [idsLikedByMe, setIdsLikedByMe] = useState<string[]>([]);

  const fetchPosts = async () => {
    //{posts:{}, idsLikedByMe:{}} response irne.
    const posts = await axios.get('/api/posts');
    setPosts(posts.data.posts);
    setIdsLikedByMe(posts.data.idsLikedByMe);
  };

  //when home page renders first time, then fetch posts from mongoDB
  useEffect(() => {
    fetchPosts();
  }, []);

  if (userInfoStatus === 'loading') {
    return 'Loading User Info...';
  }

  //if logged user has no username, then go to pick new username form component
  if (userInfo && !userInfo?.username) {
    return <UserNameForm />;
  }

  // if user is not logged in, the go to LOGIN page
  if (!userInfo) {
    router.push('/login');
    return 'no user info';
  }

  const logout = async () => {
    setUserInfo(null);
    await signOut();
  };

  return (
    <Layout>
      <h1 className='tet-xl font-bold p-4 text-white'>Home</h1>
      {/* Create a Post */}
      <PostForm
        onPost={fetchPosts}
        parent=''
        compact
        placeholder={`What\'s happening`}
      />

      {/* All Posts */}
      <div className=''>
        {posts.length > 0 &&
          posts?.map((post) => (
            <div
              className='border-t border-twitterBorder p-5 text-white'
              key={post._id}
            >
              <PostContent
                {...post}
                big={false}
                // postId-aaraa filter-deed TRUE, FALSE butsaana.
                likedByMe={idsLikedByMe.includes(post._id)}
              />
            </div>
          ))}
      </div>

      {/* LOG OUT */}

      {userInfo && (
        <div className='p-5 text-center border-t border-twitterBorder'>
          <button
            className='bg-twitterWhite text-black px-5 py-2 rounded-full'
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </Layout>
  );
};

export default Home;
