const pollsRoute = require("./polls");

module.exports = app => {
  app.use("/polls", pollsRoute);
};
