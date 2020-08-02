import axios from "axios";
const server = "https://ratingbackend.herokuapp.com";

export const fetch = async () => {
  const url = server + "/fetch";
  const { data } = await axios.get(url);
  console.log(data);
  return data;
};
export const updateData = async (info) => {
  const url = server + "/update";
  console.log(info);
  const data = await axios.put(url, info);
  console.log(data);
  return data;
};
export const deleteData = async (id) => {
  const url = server + "/delete/" + id;
  const data = await axios.delete(url);
  console.log(data);
};
export const fetchCompany = async (name) => {
  let url = server + "/fetch_company/" + name;
  url = encodeURI(url);
  const { data } = await axios.get(url);
  console.log(data);
  return data;
};
