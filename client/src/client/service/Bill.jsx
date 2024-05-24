import axios from "axios";
const URL = process.env.REACT_APP_API_ENDPOINT
export const getBillsOfCustomer = (customerId,headers) => axios.get(URL + "/bill/bills-of-customer/"+customerId,{}, { headers: headers })