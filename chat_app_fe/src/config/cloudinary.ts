import axios from "axios";

const cloudinaryURL = "https://api.cloudinary.com/v1_1/dxqkay3jr/image/upload";

const cloudinaryInstance = axios.create({ baseURL: cloudinaryURL });

export {cloudinaryInstance}