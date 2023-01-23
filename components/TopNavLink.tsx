import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Props = {
  title?: string | string[];
  url?: string;
};

const TopNavLink = ({ title = 'Tweet', url = '/' }: Props) => {
  return (
    <Link href={url} className='flex mb-2 text-white'>
      <ArrowLeftIcon className='h-6 w-6' />
      <span className='pl-2'>Tweet</span>
    </Link>
  );
};

export default TopNavLink;
