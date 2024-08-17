import { ReactNode, FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import scss from "./ResetPassword.module.scss";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import axios from "axios";

interface IFormInput {
  password: string;
  confirmPassword: string;
}

const ResetPassword: FC = (): ReactNode => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const password = watch("password");

  const onSubmit = async (data: IFormInput) => {
    try {
      const { data: resData } = await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/auth/reset-password`,
        {
          newPassword: data.password,
          token: searchParams.get("token"),
        }
      );
      alert(resData.message);
      navigate("/auth/signin");
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className={scss.reset_password}>
      <div className={scss.content + " container"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={scss.form}>
          <h3>Сбросить пароль</h3>
          {errors.confirmPassword && (
            <span className="error--true">
              {errors.confirmPassword.message}
            </span>
          )}
          <InputText
            placeholder="Ведите новый пароль"
            className="p-inputtext-sm"
            {...register("password", {
              required: "Пароль обязателен",
              minLength: {
                value: 6,
                message: "Минимальная длина пароля 6 символов",
              },
            })}
          />
          <InputText
            placeholder="Повторите новый пароль"
            className="p-inputtext-sm"
            {...register("confirmPassword", {
              required: "Подтверждение пароля обязательно",
              validate: (value) => value === password || "Пароли не совпадают",
            })}
          />
          <Button
            label="Сбросить"
            size="small"
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
