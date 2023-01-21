import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

type UserInfos = {
  email?: string;
  id?: string;
  username?: string;
  image?: string;
};

export default function useUserInfo() {
  const { data: session, status: sessionStatus } = useSession();
  const [userInfo, setUserInfo] = useState<UserInfos>();
  const [status, setStatus] = useState('loading');

  function getUserInfo() {
    if (sessionStatus === 'loading') {
      return;
    }

    if (sessionStatus === 'unauthenticated') {
      setStatus('unauthenticated');
      return;
    }

    console.log('fetch1');
    fetch(`/api/users?id=${session?.user.id}`).then((response) => {
      response.json().then((json) => {
        setUserInfo(json.user);
        setStatus('authenticated');
      });
    });
  }

  useEffect(() => {
    getUserInfo();
  }, [sessionStatus]);

  return { userInfo, setUserInfo, status };
}
