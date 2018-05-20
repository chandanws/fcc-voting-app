const pollsRoute = require("./polls");
const authRoute = require("./auth");

module.exports = app => {
  app.use("/polls", pollsRoute);
  app.use("/auth", authRoute);
};
