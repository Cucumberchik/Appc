import { ReactNode, FC } from "react";
import scss from "./Signin.module.scss";
import { useForm } from "react-hook-form";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ISigninForm {
  email: string;
  password: string;
}

const Signin: FC = (): ReactNode => {
  const navigate = useNavigate();
  const { handleSubmit, register, reset } = useForm<ISigninForm>();

  const onSubmit = async (data: ISigninForm) => {
    try {
      const { data: resData } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/auth/sign-in`,
        data
      );
      localStorage.setItem("accessToken", resData.accessToken);
      localStorage.setItem(
        "accessTokenExpiration",
        resData.accessTokenExpiration
      );
      localStorage.setItem("refreshToken", resData.refreshToken);
      alert("Успешно");
      navigate("/");
      reset();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className={scss.signin}>
      <div className={scss.content + " container"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={scss.form}>
          <h3>Войти</h3>
          <InputText
            type="text"
            className="p-inputtext-sm"
            placeholder="Ведите почту"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Введите корректный email",
              },
            })}
          />
          <InputText
            type="password"
            className="p-inputtext-sm"
            placeholder="Ведите пароль"
            {...register("password", { required: true })}
          />
          <Button
            label="Войти"
            type="submit"
            className="p-button-sm"
          />

          <Button
            type="button"
            onClick={() => navigate("/auth/forgot")}
            label="Забыли пароль?"
            link
            size="small"
          />
          <Button
            type="button"
            label="Еще не зарегистрированы?"
            onClick={() => navigate("/auth/registration")}
            link
            size="small"
          />
        </form>
      </div>
    </div>
  );
};

export default Signin;
