import axios from "axios";

// const URL = process.env.REACT_APP_API_ENDPOINT
const URL = "http://localhost:8080";

export const getListWarrantiesByIdUser = (id,headers) => axios.get(URL + `/warranty/customer/${id}`,{ headers: headers });