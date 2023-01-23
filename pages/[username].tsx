import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';
import TopNavLink from '../components/TopNavLink';

type Props = {};

const UserPage = (props: Props) => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <Layout>
      <TopNavLink title={username} />
      {username}
    </Layout>
  );
};

export default UserPage;
