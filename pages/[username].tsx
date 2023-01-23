import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Avatar from '../components/Avatar';
import Cover from '../components/Cover';
import Layout from '../components/Layout';
import PostContent from '../components/PostContent';
import TopNavLink from '../components/TopNavLink';

type Props = {};

const UserPage = (props: Props) => {
  const router = useRouter();
  const { username } = router.query;
  const [profileInfo, setProfileInfo] = useState<User>();
  const [posts, setPosts] = useState<Posts[]>([]);
  const [postsLikedByMe, setPostsLikedByMe] = useState<string[]>([]);

  //1) Getting USER data for profile page
  useEffect(() => {
    if (!username) {
      return;
    }

    axios
      .get(`/api/users?username=${username}`)
      .then((res) => setProfileInfo(res.data.user));
  }, [username]);

  //2) GETting posts for profile page
  useEffect(() => {
    if (!profileInfo?._id) {
      return;
    }

    axios.get(`/api/posts?author=${profileInfo._id}`).then((res) => {
      setPosts(res.data.posts);
      setPostsLikedByMe(res.data.idsLikedByMe);
    });
  }, [profileInfo]);

  const updateUserImage = (type: string, src: string) => {
    setProfileInfo((prev): any => ({ ...prev, [type]: src }));
  };

  return (
    <Layout>
      {!!profileInfo && (
        <main>
          <header className='px-5 py-2'>
            <TopNavLink title={profileInfo.name} />
          </header>

          <Cover
            editable={true}
            src={profileInfo.cover}
            onChange={(src) => updateUserImage('cover', src)}
          />

          <section className='flex justify-between'>
            <div className='ml-5 relative '>
              <div className='absolute -top-12 border-4 rounded-full border-black overflow-hidden'>
                <Avatar
                  big={true}
                  src={profileInfo.image}
                  editable={true}
                  onChange={(src) => updateUserImage('image', src)}
                />
              </div>
            </div>
            {/* follow button */}
            <div className='p-2'>
              <button className='bg-twitterBlue text-white py-2 px-5 rounded-full'>
                Follow
              </button>
            </div>
          </section>
          <div className='px-5 mt-2'>
            <h1 className='font-bold text-xl leading-4'>{profileInfo.name}</h1>
            <h2 className='text-twitterLightGray text-sm'>
              @{profileInfo.username}
            </h2>
            <div className='text-sm my-2'>Mars & Cars, Chips & Dips</div>
          </div>
        </main>
      )}

      {/* USER POSTS */}
      {posts?.length > 0 &&
        posts.map((post) => (
          <div className='p-5 border-t border-twitterBorder' key={post._id}>
            <PostContent
              {...post}
              // big={false}
              likedByMe={postsLikedByMe.includes(post._id)}
            />
          </div>
        ))}
    </Layout>
  );
};

export default UserPage;
