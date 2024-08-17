import { ReactNode, FC } from "react";
import "./Home.module.scss";
import MyProfil from "@/components/MyProfil/MyProfil";
import useUser from "@/zustand/user";
import scss from "./Home.module.scss";
import usePosts from "@/zustand/posts";
import Post from "@/components/Post/Post";

const Home: FC = (): ReactNode => {
  const { user } = useUser();
  const { allPosts } = usePosts();

  if (user == null) {
    return <></>;
  }

  return (
    <>
      <MyProfil user={user} />
      <h2 className={scss.publick_header}>Публичные публекаций</h2>
      {allPosts.map((post) => (
        <Post post={post} />
      ))}
    </>
  );
};

export default Home;
