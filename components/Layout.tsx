import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className='max-w-lg mx-auto border-b border-r border-twitterBorder min-h-screen'>
      {children}
    </div>
  );
};

export default Layout;
