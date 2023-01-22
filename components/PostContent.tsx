import React from 'react';
import Avatar from './Avatar';
import ReactTimeAgo from 'react-time-ago';
import Link from 'next/link';
import PostButtons from './PostButtons';

type Props = {
  author: Author;
  text: string;
  __v: number;
  _id: string;
  createdAt: string;
  big: boolean;
  likesCount: number;
  likedByMe: boolean;
};

const PostContent = ({
  text,
  author,
  _id,
  createdAt,
  likesCount,
  big,
  likedByMe,
}: Props) => {
  return (
    <div>
      <div className='flex w-full'>
        <div>
          <Avatar src={author.image} />
        </div>
        <div className='pl-2 grow'>
          <div>
            <span className='font-bold pr-1 cursor-pointer text-white'>
              {author.name}
            </span>
            {big && <br />}
            <span className='text-twitterLightGray cursor-pointer'>
              @{author.username}
            </span>
            {createdAt && !big && (
              <span className='pl-1 text-twitterLightGray'>
                <ReactTimeAgo date={new Date(createdAt)} timeStyle='twitter' />
              </span>
            )}
          </div>

          {!big && (
            <div>
              {/* http://localhost:3000/ganzogalaxy/status/63cbf64e1a85dca9902bc386 ene URL rvv vserne. */}
              <Link href={`/${author.username}/status/${_id}`}>
                <div className='w-full cursor-pointer'>{text}</div>
              </Link>
              <PostButtons
                likesCount={likesCount}
                likedByMe={likedByMe}
                id={_id}
              />
            </div>
          )}
        </div>
      </div>

      {big && (
        <div className='mt-2'>
          {/* http://localhost:3000/ganzogalaxy/status/63cbf64e1a85dca9902bc386 ene URL rvv vserne. */}
          <Link
            href={`/${author.username}/status/${_id}`}
            className='text-white'
          >
            <div className='w-full cursor-pointer'> {text}</div>
          </Link>

          {createdAt && (
            <div className='text-twitterLightGray text-sm'>
              {new Date(createdAt)
                .toISOString()
                .replace('T', ' ')
                .slice(0, 16)
                .split(' ')
                .reverse()
                .join(' ')}
            </div>
          )}
          <PostButtons likesCount={likesCount} likedByMe={likedByMe} id={_id} />
        </div>
      )}
    </div>
  );
};

export default PostContent;
