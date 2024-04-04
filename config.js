import dotenv from "dotenv";

dotenv.config();

const { PORT, HOST, HOST_URL } = process.env;
export default {
  port: PORT,
  host: HOST,
  hostUrl: HOST_URL,
};