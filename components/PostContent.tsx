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
  big?: boolean;
  likesCount: number;
  likedByMe: boolean;
  commentsCount: number;
};

const PostContent = ({
  text,
  author,
  _id,
  createdAt,
  likesCount,
  big,
  likedByMe,
  commentsCount,
}: Props) => {
  return (
    <div>
      <div className='flex w-full'>
        {/*=========== AVATAR============= */}
        <div>
          {!!author?.image && (
            // go to PROFILE page
            <Link href={`/${author.username}`}>
              <div className='cursor-pointer'>
                <Avatar src={author.image} />
              </div>
            </Link>
          )}
        </div>
        {/* ==========Username, post========== */}
        <div className='pl-2 grow'>
          <div>
            <Link href={`/${author.username}`}>
              <span className='font-bold pr-1 cursor-pointer text-white'>
                {author.name}
              </span>
            </Link>
            {big && <br />}
            <Link href={`/${author.username}`}>
              <span className='text-twitterLightGray cursor-pointer'>
                @{author.username}
              </span>
            </Link>
            {createdAt && !big && (
              <span className='pl-1 text-twitterLightGray'>
                <ReactTimeAgo date={new Date(createdAt)} timeStyle='twitter' />
              </span>
            )}
          </div>

          {/*============== POST ============= */}
          {/* on home page*/}
          {!big && (
            <div>
              {/* http://localhost:3000/ganzogalaxy/status/63cbf64e1a85dca9902bc386 ene URL rvv vserne. */}
              <Link href={`/${author.username}/status/${_id}`}>
                <div className='w-full cursor-pointer text-white'>{text}</div>
              </Link>
              <PostButtons
                likesCount={likesCount}
                likedByMe={likedByMe}
                id={_id}
                commentsCount={commentsCount}
                username={author.username}
              />
            </div>
          )}
        </div>
      </div>

      {/* on "localhost:3000/[username]/status/[id]" page */}
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
          <PostButtons
            id={_id}
            likesCount={likesCount}
            likedByMe={likedByMe}
            commentsCount={commentsCount}
          />
        </div>
      )}
    </div>
  );
};

export default PostContent;
