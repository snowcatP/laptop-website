import axios from "axios";

const URL = "http://localhost:8080"

export const getListWarrantys = () => axios.get(URL + "/warranty")