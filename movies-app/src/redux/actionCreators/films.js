import filmsAT from "../actionTypes/films";
import { addError, addInfo, addSuccess } from "./messages";
import { filmsService } from "../../services";

export const addFilm = (film) => ({
  type: filmsAT.ADD_FILM,
  payload: { film },
});

export const filmsLoading = () => ({
  type: filmsAT.FILMS_LOADING,
});

export const loadingFailed = (message) => ({
  type: filmsAT.LOADING_FAILED,
  payload: { message },
});

export const addFilms = (films) => ({
  type: filmsAT.ADD_FILMS,
  payload: { films },
});

export const deleteFilm = (id) => ({
  type: filmsAT.DELETE_FILM,
  payload: { id },
});

export const setSorting = (sortFunc) => ({
  type: filmsAT.SET_SORTING,
  payload: { sortFunc },
});

export const setOrder = (order) => ({
  type: filmsAT.SET_ORDER,
  payload: { order },
});

export const fetchFilms = () => (dispatch) => {
  dispatch(filmsLoading());
  return filmsService
    .getAll()
    .then((films) => {
      dispatch(addFilms(films));
      dispatch(addInfo("Films fetched"));
    })
    .catch((error) => {
      dispatch(loadingFailed(error));
      dispatch(addError(error));
    });
};

export const postFilm = (film) => (dispatch) => {
  return filmsService
    .postOne()
    .then((id) => {
      dispatch(addFilm({ ...film, id }));
      dispatch(addSuccess("Your film successfully posted"));
    })
    .catch((error) => {
      dispatch(addError("Your film could not be posted\nError: " + error));
    });
};

export const postFile = (file) => (dispatch) => {
  return filmsService
    .postFile(file)
    .then(() => {
      dispatch(fetchFilms());
      dispatch(addSuccess("Your file succesfully posted"));
    })
    .catch((error) => {
      dispatch(addError("Your file could not be posted\nError: " + error));
    });
};

export const removeFilm = (id) => (dispatch) => {
  return filmsService
    .deleteOne(id)
    .then((id) => {
      dispatch(deleteFilm(id));
      dispatch(addSuccess("Film successfully deleted"));
    })
    .catch((error) => {
      dispatch(addError("Film could not be deleted\nError: " + error.message));
    });
};
