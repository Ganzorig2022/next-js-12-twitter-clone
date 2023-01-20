import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const Home = () => {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState();
  const [userInfoStatus, setUserInfoStatus] = useState('loading');

  const getUserInfo = () => {
    if (status === 'loading') {
      return;
    }
    fetch(`/api/users?id=${session?.user.id}`).then((res) => {
      res.json().then((json) => {
        setUserInfo(json.user);
        setUserInfoStatus('done');
      });
    });
  };

  useEffect(() => {
    getUserInfo();
  }, [session]);

  if (userInfoStatus === 'loading') {
    return 'Loading User Info!';
  }
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>Twitter clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  );
};

export default Home;
