import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type Props = {
  providers: ProviderType;
};

const Login = ({ providers }: Props) => {
  const { data, status } = useSession(); //{user:expires...} data irne.
  const router = useRouter();

  if (status === 'loading') return null;

  //if user logged in redirect to homepage
  if (data) {
    router.push('/');
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      {Object.values(providers).map((provider, i) => (
        <div key={i}>
          <button
            className='bg-twitterWhite pl-3 pr-5 py-2 text-black rounded-full flex items-center'
            onClick={() => {
              signIn(provider.id);
            }}
          >
            <img src='/google.png' alt='' className='h-8' />
            <div className='pl-3'>Sign in with {provider.name} </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  //https://next-auth.js.org/getting-started/client#getproviders
  const providers = await getProviders();

  return {
    props: { providers },
  };
}
