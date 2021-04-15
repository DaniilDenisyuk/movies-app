import { useForm } from "react-hook-form";

import cn from "classnames";

import { email, mediumPassword } from "../../shared/validations";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", defaultValues: { email: "", password: "" } });
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
          placeholder="Email"
          {...register("email", {
            required: "required",
            validate: email || "not a valid email",
          })}
          className={cn("form__input", {
            "form__input--invalid": errors.email,
          })}
        />
        <p className="form__error-message">{errors.email}</p>
      </div>
      <div className="form__group">
        <input
          type="password"
          placeholder="Пароль"
          {...register("password", {
            required: "required",
            validate:
              mediumPassword ||
              "should contain 1 uppercase, lowercase, special and numeric character",
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
