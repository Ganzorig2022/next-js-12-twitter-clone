import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Avatar from '../components/Avatar';
import Cover from '../components/Cover';
import Layout from '../components/Layout';
import PostContent from '../components/PostContent';
import TopNavLink from '../components/TopNavLink';
import useUserInfo from '../hooks/useUserInfo';

type Props = {};

const UserPage = (props: Props) => {
  const router = useRouter();
  const { username } = router.query;
  const { userInfo } = useUserInfo();
  const [profileInfo, setProfileInfo] = useState<User>();
  const [originalUserInfo, setOriginalUserinfo] = useState<User>();
  const [posts, setPosts] = useState<Posts[]>([]);
  const [postsLikedByMe, setPostsLikedByMe] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  //1) Getting USER data for profile page
  useEffect(() => {
    if (!username) {
      return;
    }

    axios.get(`/api/users?username=${username}`).then((res) => {
      setProfileInfo(res.data.user);
      setOriginalUserinfo(res.data.user);
    });
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
    setProfileInfo((prev) => ({ ...prev, [type]: src } as User));
  };

  // Works when click the SAVE button
  const updateProfile = async () => {
    const { bio, name, username } = profileInfo as User;
    await axios.put('/api/profile', { bio, name, username });
    setEditMode(false);
  };

  // Works when click the CANCEL button
  const cancelEdit = () => {
    const { bio, name, username } = originalUserInfo as User;
    setProfileInfo((prev) => ({ ...prev, bio, name, username } as User));
    setEditMode(false);
  };

  //
  const toggleFollow = async () => {
    setIsFollowing((prev) => !prev);
    await axios.post('/api/followers', { destination: profileInfo?._id });
  };

  //for checking whether show follow and edit button or not
  const isMyProfile = profileInfo?._id === userInfo?._id; //boolean

  return (
    <Layout>
      {!!profileInfo && (
        <main>
          <header className='px-5 py-2'>
            <TopNavLink title={profileInfo.name} />
          </header>

          <Cover
            editable={isMyProfile}
            src={profileInfo.cover}
            onChange={(src) => updateUserImage('cover', src)}
          />

          <section className='flex justify-between'>
            <div className='ml-5 relative '>
              <div className='absolute -top-12 border-4 rounded-full border-black overflow-hidden'>
                <Avatar
                  big={true}
                  src={profileInfo.image}
                  editable={isMyProfile}
                  onChange={(src) => updateUserImage('image', src)}
                />
              </div>
            </div>
            {/* =====BUTTONS==== */}
            {/* If logged userId is NOT EQUAL to userProfileId, then show FOLLOW button. */}
            <div className='p-2'>
              {!isMyProfile && (
                <button
                  className={`${
                    isFollowing
                      ? 'bg-twitterWhite text-black'
                      : 'bg-twitterBlue'
                  }  text-white py-2 px-5 rounded-full`}
                  onClick={toggleFollow}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
              {/* If logged userId is EQUAL to userProfileId, then show EDIT PROFILE button. */}
              {isMyProfile && (
                <div>
                  {!editMode && (
                    <button
                      className='bg-twitterBlue text-white py-2 px-5 rounded-full'
                      onClick={() => setEditMode(true)}
                    >
                      Edit Profile
                    </button>
                  )}
                  {editMode && (
                    <div>
                      <button
                        className='bg-twitterWhite text-black py-2 px-5 rounded-full mr-1'
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                      <button
                        className='bg-twitterBlue text-white py-2 px-5 rounded-full'
                        onClick={updateProfile}
                      >
                        Save profile
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* =====NAME, USERNAME, BIO==== */}
          <div className='px-5 mt-2'>
            {!editMode && (
              <h1 className='font-bold text-xl leading-5'>
                {profileInfo?.name}
              </h1>
            )}
            {editMode && (
              <div>
                <input
                  onChange={(e) =>
                    setProfileInfo((prev): any => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  type='text'
                  value={profileInfo.name}
                  className='bg-twitterBorder p-2 mb-1 rounded-full'
                />
              </div>
            )}
            {!editMode && (
              <h2 className='text-twitterLightGray text-sm'>
                @{profileInfo.username}
              </h2>
            )}
            {editMode && (
              <div>
                <input
                  onChange={(e) =>
                    setProfileInfo((prev): any => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  type='text'
                  value={profileInfo.username}
                  className='bg-twitterBorder p-2 mb-2 rounded-full'
                />
              </div>
            )}

            {!editMode && <div className='text-sm my-2'>{profileInfo.bio}</div>}
            {editMode && (
              <div>
                <textarea
                  onChange={(e) =>
                    setProfileInfo((prev): any => ({
                      ...prev,
                      bio: e.target.value,
                    }))
                  }
                  value={profileInfo.bio}
                  className='bg-twitterBorder p-2 mb-2 rounded-2xl w-full'
                />
              </div>
            )}
          </div>
        </main>
      )}

      {/* ======USER POSTS===== */}
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
