import { API_URL } from "../shared/apiUrl";

const login = (login, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
  };

  return fetch(`${API_URL}/users/authenticate`, requestOptions).then(
    handleResponse
  );
};

const register = (userInfo) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfo),
  };
  return fetch(`${API_URL}/users/register`, requestOptions).then(
    handleResponse
  );
};

const logout = (token) => {
  if (!token) return;
  const requestOptions = {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  };
  return fetch(`${API_URL}/users/revoke-token`, requestOptions).then(
    handleResponse
  );
};

const refreshToken = () => {
  const requestOptions = {
    method: "POST",
  };
  return fetch(`${API_URL}/users/refresh-token`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      return user;
    });
};

const handleResponse = (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};

export const authService = {
  login,
  register,
  logout,
  refreshToken,
};
