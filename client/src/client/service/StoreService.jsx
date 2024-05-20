import axios from "axios";

const URL = process.env.REACT_APP_API_ENDPOINT

export const getListProducts = (page) => axios.get(URL + `/product/store?page=${page}&size=9`)