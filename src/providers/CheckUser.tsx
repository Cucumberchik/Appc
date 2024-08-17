import usePosts from "@/zustand/posts";
import useUser from "@/zustand/user";
import axios from "axios";
import { ReactNode, FC, useState, useEffect } from "react";

const CheckUser: FC<{ children: ReactNode }> = ({ children }): ReactNode => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const accessToken = localStorage.getItem("accessToken") || "";
  const refreshToken = localStorage.getItem("refreshToken") || "";

  const { setAllPosts } = usePosts();

  {
    if (
      !accessToken &&
      window.location.pathname !== "/auth/signin" &&
      !window.location.search
    ) {
      window.location.replace("/auth/signin");
    }
  }

  const { setUser } = useUser();

  const handleGetUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/auth/user`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const { data: allPosts } = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND_URL}/post/get-all`
      );

      setAllPosts(allPosts)

      setUser(data.profile);
    } catch (e: any) {
      if (refreshToken) {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/auth/refresh`,
          { refreshToken }
        );
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem(
          "accessTokenExpiration",
          data.accessTokenExpiration
        );
        window.location.reload();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(false);

    if (accessToken || refreshToken) {
      handleGetUser();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="loader_container">
        <span className="loader" />
      </div>
    );
  }
  return children;
};

export default CheckUser;
