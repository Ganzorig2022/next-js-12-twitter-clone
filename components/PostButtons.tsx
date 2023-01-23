import {
  ArrowPathIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { useState } from 'react';
import FlipNumbers from 'react-flip-numbers';

type Props = {
  id: string;
  likesCount: number;
  likedByMe: boolean;
  commentsCount: number;
};

// LIKE - COMMENT - SHARE buttons
const PostButtons = ({
  id,
  likesCount: likesCountDefault = 0,
  likedByMe: likedByMeDefault = false,
  commentsCount,
}: Props) => {
  const [likesCount, setLikesCount] = useState(likesCountDefault);
  const [likedByMe, setLikedByMe] = useState<boolean>(likedByMeDefault);

  //
  const toggleLike = async () => {
    const response = await axios.post('/api/like', { id });

    // if there is no like count, then INCREASE, otherwise decrease...
    if (response.data) {
      setLikesCount((prev) => prev + 1);
      setLikedByMe(true);
    } else {
      setLikesCount((prev) => prev - 1);
      setLikedByMe(false);
    }
  };

  return (
    <div className='flex justify-between mr-12 text-twitterLightGray text-sm mt-1'>
      <button className='flex'>
        <ChatBubbleLeftIcon className='w-5 h-5 mr-1' />
        <span>{commentsCount}</span>
      </button>
      <button className='flex '>
        <ArrowPathIcon className='w-5 h-5 mr-1' />
        <span>0</span>
      </button>
      <button
        className={`flex items-center ${
          likedByMe ? 'text-red-500 fill-red-500' : ''
        }`}
        onClick={toggleLike}
      >
        <HeartIcon className='w-5 h-5 mr-1 fill-inherit' />
        <span>
          <FlipNumbers
            height={12}
            width={12}
            color=''
            background=''
            play
            perspective={100}
            numbers={likesCount.toString()}
          />
        </span>
      </button>
      <button className='flex '>
        <ShareIcon className='w-5 h-5 mr-1' />
      </button>
    </div>
  );
};

export default PostButtons;
