import UserCard from "@/components/common/UserCard";
import { UserProps } from "@/interfaces";

interface UsersProps {
  posts: UserProps[];
}

function Users({ posts }: UsersProps) {
  return (
    <div style={{ maxWidth: 800, margin: "24px auto", padding: "0 16px" }}>
      <h1 style={{ marginBottom: 16 }}>Users</h1>
      <div className="space-y-4">
        {posts.map((user: UserProps) => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const posts: UserProps[] = await response.json();

  return {
    props: {
      posts,
    },
  };
}

export default Users;
