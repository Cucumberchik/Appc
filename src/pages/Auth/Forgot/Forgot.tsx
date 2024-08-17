import { ReactNode, FC } from "react";
import scss from "./Forgot.module.scss";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import axios from "axios";

const Forgot: FC = (): ReactNode => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    try {
      const { data: resData } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/auth/forgot`,
        {
          ...data,
          frontEndUrl: `http://${window.location.host}/auth/reset-password`,
        }
      );
      alert(resData.message);
      reset();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className={scss.forgot}>
      <div className={scss.content + " container"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={scss.form}>
          <h3>Восстоновить пароль</h3>
          {errors.email && (
            <p className="error--true"> {errors.email.message}</p>
          )}
          <InputText
            placeholder="Ваша почта"
            className="p-inputtext-sm"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Введите корректный email",
              },
            })}
          />
          <Button
            label="Отправить"
            type="submit"
            size="small"
          />
          <Button
            label="Назад"
            type="button"
            onClick={() => window.history.back()}
            link
            size="small"
          />
        </form>
      </div>
    </div>
  );
};

export default Forgot;
