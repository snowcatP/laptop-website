import axios from 'axios';

const URL = "http://localhost:8080";

const loginResult = () => axios.post(URL + "/auth/login");

export default {
    loginResult,
}