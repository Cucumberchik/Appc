import { ReactNode, FC } from "react";
import scss from "./MyProfil.module.scss";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const MyProfil: FC<{ user: UserType }> = ({ user }): ReactNode => {
  const navigate = useNavigate();
  return (
    <div className={scss.my_profil}>
      <div className={scss.content + " container"}>
        <img
          src={user.photo}
          alt=""
        />
        <div className={scss.title}>
          <h4>{user.username}</h4>
          <p>Регистрация {user.createdAt}</p>
        </div>

        <Button
          link
          label="Мои посты"
          onClick={() => navigate("/myposts")}
        />
      </div>
    </div>
  );
};

export default MyProfil;
