import axios from "axios";

const URL = process.env.REACT_APP_API_ENDPOINT

export const getAllEmployees = (headers) => axios.get(URL + "/admin/staff", {headers})

export const deleteEmployee = (id, headers) => axios.delete(URL + `/admin/staff/delete/${id}`, {headers})

export const addNewEmployee = (request, headers) => axios.post(URL + "/admin/staff", request, {headers})