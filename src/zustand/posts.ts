import { create } from "zustand";

interface IPosts {
  allPosts: PostType[];
  setAllPosts: (posts: PostType[]) => void;
}

const usePosts = create<IPosts>((set) => ({
  allPosts: [],
  setAllPosts: (posts) => set({ allPosts: posts }),
}));

export default usePosts;
