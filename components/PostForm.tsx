import React, { FormEvent, useState } from 'react';
import useUserInfo from '../hooks/useUserInfo';
import axios from 'axios';
import Avatar from './Avatar';

type Props = {
  // onPost: () => {};
  onPost: () => void; //same as above
  compact: boolean;
  placeholder: string;
  parent: string | string[] | undefined;
};

const PostForm = ({ onPost, compact, parent, placeholder }: Props) => {
  const { userInfo, status } = useUserInfo();
  const [text, setText] = useState<string>();

  if (status === 'loading') {
    return null;
  }

  //Post request to mongoDb for creating new post text
  const handlePostSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post('/api/posts', { text, parent });
    setText('');

    if (onPost) {
      onPost();
    }
  };

  return (
    <form className='mx-5' onSubmit={handlePostSubmit}>
      <div className={`flex ${compact ? 'items-center' : ''}`}>
        <div className=''>
          <Avatar
            src={userInfo?.image}
            big={false}
            editable={false}
            onChange={() => {}}
          />
        </div>
        <div className='grow pl-4'>
          <textarea
            className={`${
              compact ? 'h-10 mt-1' : 'h-24'
            } w-full p-2 text-twitterWhite bg-transparent`}
            placeholder={placeholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {!compact && (
            <div className='p-5 text-center border-t border-twitterBorder py-2'>
              <button className='bg-twitterBlue text-white px-5 py-2 rounded-full'>
                Tweet
              </button>
            </div>
          )}
        </div>
        {compact && (
          <div className='pl-2'>
            <button className='bg-twitterBlue text-white px-5 py-2 rounded-full'>
              Tweet
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default PostForm;
