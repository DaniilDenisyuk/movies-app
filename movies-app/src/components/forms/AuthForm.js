import { useForm } from "react-hook-form";

import cn from "classnames";
import Button from "../Button";

export const AuthForm = ({ handleSubmit }) => {
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", defaultValues: { login: "", password: "" } });
  const onSubmit = (data, e) => {
    handleSubmit(data);
  };
  const onError = (errors, e) => console.log(errors, e);
  return (
    <form onSubmit={formSubmit(onSubmit, onError)} className="form">
      <h2 className="form__heading">Авторизация</h2>
      <div className="form__group">
        <input
          type="text"
          placeholder="Ваш логин"
          {...register("login", { required: "required" })}
          className={cn("form__input", {
            "form__input--invalid": errors.login,
          })}
        />
        {errors.login && (
          <p className="form__error-message">{errors.login.message}</p>
        )}
      </div>
      <div className="form__group">
        <input
          type="password"
          placeholder="Пароль"
          {...register("password", {
            required: "required",
          })}
          className={cn("form__input", {
            "form__input--invalid": errors.password,
          })}
        />
        {errors.password && (
          <p className="form__error-message">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="form__submit">
        Войти
      </Button>
    </form>
  );
};
