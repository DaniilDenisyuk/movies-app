import { API_URL } from "../shared/apiUrl";

const getAll = () => {
  return fetch(`${API_URL}/movies`).then(handleResponse);
};

const postOne = (movie) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(movie),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(`${API_URL}/movies`, requestOptions).then(handleResponse);
};

const postFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const requestOptions = {
    method: "POST",
    body: formData,
  };
  return fetch(`${API_URL}/movies/upload`, requestOptions).then(handleResponse);
};

const deleteOne = (id) => {
  const requestOptions = {
    method: "DELETE",
  };
  return fetch(`${API_URL}/movies/${id}`, requestOptions).then(handleResponse);
};

const handleResponse = (response) => {
  return response.json().then((data) => {
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
};

export const filmsService = {
  getAll,
  postOne,
  postFile,
  deleteOne,
};
