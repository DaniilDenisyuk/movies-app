import { API_URL } from "../shared/apiUrl";

const getAllUsers = (token) => {
  if (!token) return;
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  return fetch(`${API_URL}/users`, requestOptions).then(handleResponse);
};

const getAllProfiles = (id, token) => {
  if (!token) return;
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };

  return fetch(`${API_URL}/users/${id}/profiles`, requestOptions).then(
    handleResponse
  );
};

const getDashboardInfo = (token) => {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };

  return fetch(`${API_URL}/users/dashboard`, requestOptions).then(
    handleResponse
  );
};

const handleResponse = (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        //logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};

export const usersProfilesService = {
  getAllUsers,
  getAllProfiles,
  getDashboardInfo,
};
