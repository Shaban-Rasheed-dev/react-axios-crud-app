import axios from "axios";
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
export const getapi = () => {
  return api.get("/posts");
};
export const deletepost = (id) => {
  return api.delete(`/posts/${id}`);
};
export const postData = (post) => {
  return api.post("/posts", post);
};
export const UpdateDatta = (id, post) => {
  return api.put(`/posts/${id}`, post);
};
