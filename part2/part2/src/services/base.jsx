import axios, { Axios } from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, newInfo) => {
  return axios.put(`${baseUrl}/${id}`, newInfo);
};

export { getAll, create, remove, update };
