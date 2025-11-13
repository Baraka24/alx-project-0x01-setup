export interface PostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
  };
  company?: {
    catchPhrase: string;
  };
}