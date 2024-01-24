const express = require("express");
const proxy = require("http-proxy-middleware");
const jwt = require("jsonwebtoken");
const redis = require("redis");
const app = express();
const { promisify } = require("util");
const { ForBiddienError } = require("./src/utils/errorHandler");
const { OK } = require("./src/utils/successHandler");
require("./src/db.init/mongoDB.congif");
const port = 3000;

const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

// Middleware để lấy token từ header và parse payload
const getTokenFromHeader = (req) => {
  const authorizationHeader = req.headers["authorization"];
  if (authorizationHeader) {
    const decodedToken = jwt.decode(authorizationHeader, { complete: true });
    const payload = decodedToken ? decodedToken.payload : null;
    return payload;
  }
  //lỗi
  return null;
};

app.use(express.json());
app.use("/", async (req, res, next) => {
  try {
    const payload = getTokenFromHeader(req);
    if (!payload) throw new ForBiddienError();

    const redisTokenData = await getAsync(`token:${payload.id}`);
    if (!redisTokenData) throw new ForBiddienError();

    const urlAsString = req.url.toString();
    urlAsString = `${urlAsString}-ShopShop`;
    const redisData = await getAsync(urlAsString);
    if (redisData) {
      return new OK({
        message: "Successfully!",
        metaData: redisData,
      });
    }
    // else {
    //   const permissions =
    //     await Permission.find(/* tùy chỉnh điều kiện truy vấn */);
    //   res.setHeader("X-Permissions", JSON.stringify(permissions));
    //   setAsync("cached_permissions", JSON.stringify(permissions));
    // }
    const proxyResult = await proxy({
      changeOrigin: true,
      router: (req) =>
        req.method === "GET"
          ? "http://localhost:5000"
          : "http://localhost:5001",
    })(req, res, next);
    setAsync(urlAsString, proxyResult);
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      code: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

app.listen(port, () => {
  console.log(`BFF server is running at http://localhost:${port}`);
});
