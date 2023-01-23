import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Props = {
  title?: string | string[];
  url?: string;
};

const TopNavLink = ({ title = 'Tweet', url = '/' }: Props) => {
  return (
    <Link href={url} className='text-white'>
      <div className='flex mb-5 cursor-pointer'>
        <ArrowLeftIcon className='h-6 w-6' />
        <span className='pl-2'>{title}</span>
      </div>
    </Link>
  );
};

export default TopNavLink;
