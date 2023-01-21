import React from 'react';
import Avatar from './Avatar';
import ReactTimeAgo from 'react-time-ago';
import Link from 'next/link';

type Props = {
  text: string;
  __v: number;
  _id: string;
  author: Author;
  createdAt: string;
};

const PostContent = ({ text, author, _id, createdAt }: Props) => {
  return (
    <div className='flex'>
      <div>
        <Avatar src={author.image} />
      </div>
      <div className='pl-2'>
        <div>
          <span className='font-bold pr-1 cursor-pointer'>{author.name}</span>
          <span className='text-twitterLightGray cursor-pointer'>
            @{author.username}
          </span>
          <span className='pl-1 text-twitterLightGray'>
            <ReactTimeAgo date={new Date(createdAt)} timeStyle='twitter' />
          </span>
        </div>
        {/* http://localhost:3000/ganzogalaxy/status/63cbf64e1a85dca9902bc386 ene URL rvv vserne. */}
        <Link href={`/${author.username}/status/${_id}`}>{text}</Link>
      </div>
    </div>
  );
};

export default PostContent;
