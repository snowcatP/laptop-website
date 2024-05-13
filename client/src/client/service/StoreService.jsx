import axios from "axios";

const URL = "http://localhost:8080"

export const getListProducts = (page) => axios.get(URL + `/product/store?page=${page}&size=9`)