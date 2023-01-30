import axios from "axios";
import { host } from "../../utils/constant";

export default async function handler(req, res) {
  console.log("requests",req.query);
  const data = req.query;
  const response = await axios.post(`${host}/payments/link/confirm`,data)
  console.log(response)
}