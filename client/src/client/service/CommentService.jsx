import axios from "axios";

const URL = process.env.REACT_APP_API_ENDPOINT

export const getListComment = (id) => axios.get(URL + `/comment/${id}`)

export const addNewComment = (comment, headers) => axios.post(URL + "/comment/add", comment, {headers})