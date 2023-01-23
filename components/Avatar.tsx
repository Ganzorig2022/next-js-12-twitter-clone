import React from 'react';

type Props = {
  src?: string;
  big?: boolean;
};

const Avatar = ({ src, big }: Props) => {
  const widthClass = big ? 'w-24' : 'w-12';
  return (
    <div className={`rounded-full overflow-hidden ${widthClass}`}>
      <img src={src} alt='avatar' />
    </div>
  );
};

export default Avatar;
