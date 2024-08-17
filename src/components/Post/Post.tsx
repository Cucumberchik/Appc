import { ReactNode, FC } from "react";
import scss from "./Post.module.scss";

const Post: FC<{ post: PostType }> = ({ post }): ReactNode => {
  return (
    <div className={scss.post}>
      <div className={scss.content + " container"}>
        <img
          src={post.mediaUrl}
          alt=""
        />

        <h4>{post.caption}</h4>
      </div>
    </div>
  );
};

export default Post;
