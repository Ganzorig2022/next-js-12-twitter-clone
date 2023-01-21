import { FormEvent, useEffect, useState } from 'react';
import useUserInfo from '../hooks/useUserInfo';
import { useRouter } from 'next/router';

export default function UserNameForm() {
  const { userInfo, status } = useUserInfo();
  const [username, setUsername] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (username === '') {
      const defaultUsername: any = userInfo?.email?.split('@')[0];
      setUsername(defaultUsername?.replace(/[^a-z]+/gi, ''));
    }
  }, [status]);

  if (status === 'loading') {
    return null;
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/
    e.preventDefault();

    try {
      //Updating USERNAME to mongoDB
      await fetch('http://localhost:3000/api/users', {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      <form className='text-center' onSubmit={handleFormSubmit}>
        <h1 className='text-xl mb-2'>Pick a username</h1>
        <input
          type='text'
          className='block mb-1 bg-twitterBorder px-3 py-1 rounded-full'
          placeholder={'username'}
          value={username || ''}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button className='block bg-twitterBlue w-full rounded-full py-1'>
          Continue
        </button>
      </form>
    </div>
  );
}
