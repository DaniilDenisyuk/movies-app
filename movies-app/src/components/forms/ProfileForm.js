import { useForm } from "react-hook-form";
import { useState } from "react";
import cn from "classnames";
import Button from "../Button";

import {
  date,
  limitNumbers,
  limitSpecialChars,
} from "../../helpers/validations";

export const ProfileForm = ({ handleSubmit, handleReject, profile }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: profile ? profile.name : "",
      gender: profile ? profile.gender : "",
      birthdate: profile ? profile.birthdate : "",
      city: profile ? profile.city : "",
    },
  });
  const onSubmit = async (data, e) => {
    setIsSubmitting(true);
    await handleSubmit(data);
    setIsSubmitting(false);
  };
  const onError = (errors, e) => console.log(errors, e);

  return (
    <form onSubmit={formSubmit(onSubmit, onError)} className="form">
      <h2 className="form__heading">Редактирование профиля</h2>
      <div className="form__group">
        <p className="form__label">Имя</p>
        <input
          type="text"
          {...register("name", { required: "required" })}
          className={cn("form__input", {
            "form__input--invalid": errors.name,
          })}
        />
        {errors.name && (
          <p className="form__error-message">{errors.name.message}</p>
        )}
      </div>
      <div className="form__group">
        <p className="form__label">Пол</p>
        <input
          type="text"
          {...register("gender", {
            required: "required",
          })}
          className={cn("form__input", {
            "form__input--invalid": errors.gender,
          })}
        />
        {errors.gender && (
          <p className="form__error-message">{errors.gender.message}</p>
        )}
      </div>
      <div className="form__group">
        <p className="form__label">Дата рождения</p>
        <input
          type="text"
          {...register("birthdate", {
            required: "required",
            validate: date,
          })}
          className={cn("form__input", {
            "form__input--invalid": errors.birthdate,
          })}
        />
        {errors.birthdate && (
          <p className="form__error-message">{errors.birthdate.message}</p>
        )}
      </div>
      <div className="form__group">
        <p className="form__label">Город</p>
        <input
          type="text"
          {...register("city", {
            required: "required",
            validate: {
              limitNumbers,
              limitSpecialChars,
            },
          })}
          className={cn("form__input", {
            "form__input--invalid": errors.password,
          })}
        />
        {errors.password && (
          <p className="form__error-message">{errors.password.message}</p>
        )}
      </div>
      <div className="form__buttons"></div>
      <Button type="submit" className="form__button">
        &#2713;
      </Button>
      <Button onClick={handleReject} className="form__button">
        &times;
      </Button>
    </form>
  );
};
