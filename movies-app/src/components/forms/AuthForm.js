import { useForm } from "react-hook-form";

import cn from "classnames";

import { mediumPassword } from "../../shared/validations";

export const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", defaultValues: { login: "", password: "" } });
  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="form__heading">
        Заполните форму,
        <br />
        что бы добавить фильм:
      </h2>
      <div className="form__group">
        <input
          type="text"
          placeholder="Ваш логин"
          {...register("login", { required: "required" })}
          className={cn("form__input", {
            "form__input--invalid": errors.login,
          })}
        />
        <p className="form__error-message">{errors.login}</p>
      </div>
      <div className="form__group">
        <input
          type="password"
          placeholder="Пароль"
          {...register("password", {
            required: "required",
            minLength: {
              value: 6,
              message: "Minimal 6 characters",
            },
          })}
          className={cn("form__input", {
            "form__input--invalid": errors.password,
          })}
        />
        <p className="form__error-message">{errors.password}</p>
      </div>
      <button type="submit" className="form__submit">
        Войти
      </button>
    </form>
  );
};
