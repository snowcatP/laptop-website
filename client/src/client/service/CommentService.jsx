import axios from "axios";

const URL = "http://localhost:8080"

export const getListComment = (id) => axios.get(URL + `/comment/${id}`)