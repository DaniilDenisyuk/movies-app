import { FilmForm, AuthForm, RegisterForm } from "./forms";
import FilmInfo from "./FilmInfo";
import Confirm from "./Confirm";
import Modal from "./HOCs/Modal";

export const ConfirmModal = Modal(Confirm);
export const AuthFormModal = Modal(AuthForm);
export const RegistrFormModal = Modal(RegisterForm);
export const FilmFormModal = Modal(FilmForm);
export const FilmInfoModal = Modal(FilmInfo);
