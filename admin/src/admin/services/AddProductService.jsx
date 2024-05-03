import axios from "axios";

const URL = "http://localhost:8080"

export const addProduct = (credential) => axios.post(URL + `/product/add`,credential)