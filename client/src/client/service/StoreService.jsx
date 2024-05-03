import axios from "axios";

const URL = "http://localhost:8080"

export const getListProducts = () => axios.get(URL + "/product")