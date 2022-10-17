import axios from "axios";

const backendURL = "http://localhost:3001/";

const backendInstance = axios.create({
    baseURL: backendURL, headers: {
    "Content-Type" : "application/json"
} });

export {backendInstance}