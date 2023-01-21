import React, { FormEvent, useState } from 'react';
import useUserInfo from '../hooks/useUserInfo';
import axios from 'axios';
import Avatar from './Avatar';

type Props = {
  // onPost: () => {};
  onPost: () => void; //same as above
};

const PostForm = ({ onPost }: Props) => {
  const { userInfo, status } = useUserInfo();
  const [text, setText] = useState<string>();

  if (status === 'loading') {
    return null;
  }

  //Post request to mongoDb for creating new post text
  const handlePostSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post('/api/posts', { text });
    setText('');

    if (onPost) {
      onPost();
    }
  };

  return (
    <form className='mx-5' onSubmit={handlePostSubmit}>
      <div className='flex'>
        <div className=''>
          <Avatar src={userInfo?.image} />
        </div>
        <div className='grow pl-4'>
          <textarea
            className='w-full p-2 text-twitterWhite bg-transparent'
            placeholder={`What\'s happening?`}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className='p-5 text-center border-t border-twitterBorder py-2'>
            <button className='bg-twitterBlue text-black px-5 py-2 rounded-full'>
              Tweet
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
