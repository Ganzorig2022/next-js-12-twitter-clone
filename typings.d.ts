interface ProviderType {
  callbackUrl: string;
  id: string;
  name: string;
  signinUrl: string;
  type: string;
}

interface Author {
  email: string;
  emailVerified: string | null;
  image: string;
  name: string;
  username: string;
  _id: string;
}
