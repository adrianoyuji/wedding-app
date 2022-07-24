import axios from "axios";
import store from "../store/store";
import { logOut } from "../store/User/slice";

axios.defaults.baseURL = "/api/";

export const setBearerToken = (token) => {
  axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
};

axios.interceptors.response.use(
  (response) => {
    if (
      !axios.defaults.headers.common["authorization"] &&
      localStorage.getItem("access")
    ) {
      axios.defaults.headers.common["authorization"] =
        localStorage.getItem("access");
    }
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      store.dispatch(logOut());
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  patch: (url, body) => axios.patch(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};

const Gifts = {
  listAll: () => requests.get("gifts"),
  create: (newGift) => requests.post("gifts", newGift),
  delete: (id) => requests.delete(`gifts/${id}`),
  update: (updatedGift) => requests.put(`gifts/${updatedGift.id}`, updatedGift),
};

const Families = {
  listAll: () => requests.get("families"),
  create: (newFamily) => requests.post("families", newFamily),
  delete: (id) => requests.delete(`families/${id}`),
  update: (updatedFamily) =>
    requests.put(`/families/${updatedFamily.id}`, updatedFamily),
  createMember: (familyId, member) =>
    requests.post(`/families/${familyId}/members`, { member }),
  destroyMember: (familyId, memberId) =>
    requests.delete(`/families/${familyId}/members/${memberId}`),
};

const User = {
  login: (username, password) => requests.post("auth", { username, password }),
};

const agent = { Gifts, User, Families };

export default agent;
