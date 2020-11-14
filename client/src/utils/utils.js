import { default as axiosBase } from "axios";
import conf from "../../conf";

export let inProd = process.env.NODE_ENV === "production";
console.log("Configuring based on isProd =", inProd);

console.log("UTILS", conf.get("SERVER_URL"));
export const axios = axiosBase.create({
  baseURL: conf.get("SERVER_URL"),
  // withCredentials: true
  /* other custom settings */
});
