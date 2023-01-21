import React from 'react';

type Props = {
  src?: string;
};

const Avatar = ({ src }: Props) => {
  return (
    <div className='rounded-full overflow-hidden w-12'>
      <img src={src} alt='avatar' />
    </div>
  );
};

export default Avatar;
