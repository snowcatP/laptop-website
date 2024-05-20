import axios from "axios";

const URL = process.env.REACT_APP_API_ENDPOINT

export const getListWarrantys = () => axios.get(URL + "/warranty")

export const addWarranty = (credential) => axios.post(URL + `/warranty/add`,credential)