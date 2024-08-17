import { ReactNode, FC } from "react";
import scss from "./Registration.module.scss";
import { useForm } from "react-hook-form";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface IRegistrationForm {
  photo: FileList;
  email: string;
  password: string;
  username: string;
}

const Registration: FC = (): ReactNode => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    watch,

    formState: { errors },
  } = useForm<IRegistrationForm>();

  const onSubmit = async (data: IRegistrationForm) => {
    const formData = new FormData();
    formData.append("file", data.photo[0]);

    try {
      const { data: photoData } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/upload/file`,
        formData
      );

      const { data: resData } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/auth/sign-up`,
        {
          ...data,
          photo: photoData.url,
        }
      );

      alert(resData.message);

      reset();
      navigate("/auth/signin");
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
  };

  return (
    <div className={scss.registration}>
      <div className={scss.content + " container"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={scss.form}>
          <h3>Регистрация</h3>

          <input
            id="choose_file"
            className={scss.input_choose}
            type="file"
            accept="image/*"
            {...register("photo", {
              required: "Фото обязательно для загрузки",
            })}
          />

          {errors.photo && (
            <span className="error--true">{errors.photo.message}</span>
          )}
          {errors.email && (
            <span className="error--true">{errors.email.message}</span>
          )}
          {errors.password && (
            <span className="error--true">{errors.password.message}</span>
          )}
          <label
            className={scss.label_choose}
            htmlFor="choose_file">
            {watch("photo") ? "Фото загружен" : "Загрузить фото"}
          </label>

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
            type="text"
            className="p-inputtext-sm"
            placeholder="Ведите имя пользователя"
            {...register("username", { required: true })}
          />
          <InputText
            type="text"
            className="p-inputtext-sm"
            placeholder="Ведите пароль"
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Пароль должна содержать минимум 6 символов",
              },
            })}
          />
          <Button
            label="Войти"
            type="submit"
            size="small"
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
            label="Уже зарегистрированы?"
            onClick={() => navigate("/auth/signin")}
            link
            size="small"
          />
        </form>
      </div>
    </div>
  );
};

export default Registration;
