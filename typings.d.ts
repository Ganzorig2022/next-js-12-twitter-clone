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
interface User {
  email: string;
  emailVerified: string | null;
  image: string;
  name: string;
  username: string;
  _id: string;
}

interface Posts {
  author: Author;
  commentsCount: number;
  createdAt: string;
  likesCount: number;
  parent: string;
  text: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
