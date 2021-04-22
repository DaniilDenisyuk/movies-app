import { useForm } from "react-hook-form";
import { useState } from "react";
import cn from "classnames";
import Button from "../Button";
import { email, mediumPassword } from "../../shared/validations";

export const RegisterForm = ({
  handleSubmit,
  submitComponent: Component,
  submitMessage,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit: fromSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", defaultValues: { email: "", password: "" } });
  const onSubmit = async (data, e) => {
    setIsSubmitting(true);
    await handleSubmit(data);
    setIsSubmitting(false);
  };
  const onError = (errors, e) => console.log(errors, e);

  return (
    <form onSubmit={fromSubmit(onSubmit, onError)} className="form">
      <h2 className="form__heading">Регистрация</h2>
      <div className="form__group">
        <input
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "required",
            validate: email,
          })}
          className={cn("form__input", {
            "form__input--invalid": errors.email,
          })}
        />
        {errors.email && (
          <p className="form__error-message">{errors.email.message}</p>
        )}
      </div>
      <div className="form__group">
        <input
          type="password"
          placeholder="Пароль"
          {...register("password", {
            required: "required",
            validate: mediumPassword,
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
        {isSubmitting ? (
          Component ? (
            <Component message={submitMessage ? submitMessage : ""} />
          ) : submitMessage ? (
            submitMessage
          ) : (
            "Регистрация..."
          )
        ) : (
          "Зарегистрироваться"
        )}
      </Button>
    </form>
  );
};
