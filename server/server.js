import express from "express";
require("dotenv").config();
import cors from "cors";
import initRoutes from "./src/routes";
import connectDatabase from "./src/config/connectDatabase";
//import generateDate from "./src/ultils/generateDate";
// import { getNumberFromString } from "./src/ultils/common";
// console.log(getNumberFromString("15 triệu/tháng"));
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    method: ["POST", "GET", "PUT", "DELETE"],
  })
);
//đọc dữ liệu file json được gửi từ client
app.use(express.json({ limit: "10mb" }));
//đọc data từ gửi từ client
app.use(express.urlencoded({ extend: true, limit: "10mb" }));

initRoutes(app);
//ket noi db
connectDatabase();
const port = process.env.PORT || 6789;

const listener = app.listen(port, () => {
  console.log(`Server is running on the port ${listener.address().port}`);
});
