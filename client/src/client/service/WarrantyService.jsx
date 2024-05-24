import axios from "axios";

// const URL = process.env.REACT_APP_API_ENDPOINT
const URL = process.env.REACT_APP_API_ENDPOINT

export const getListWarrantiesByIdUser = (id,headers) => axios.get(URL + `/warranty/customer/${id}`,{ headers: headers });