import authRouter from "./auth";
import insertRouter from "./insert";
import categoryRouter from "./category";
import postRouter from "./post";
import priceRoute from "./price";
import areaRoute from "./area";
import provinceRoute from "./province";
import userRoute from "./user";

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/insert", insertRouter);
  app.use("/api/v1/category", categoryRouter);
  app.use("/api/v1/post", postRouter);
  app.use("/api/v1/price", priceRoute);
  app.use("/api/v1/area", areaRoute);
  app.use("/api/v1/province", provinceRoute);
  app.use("/api/v1/user", userRoute);
  return app.use("/", (req, res) => {
    res.send("Server on");
  });
};

export default initRoutes;
