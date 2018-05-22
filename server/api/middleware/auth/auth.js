const jwt = require("jsonwebtoken");

exports.authenticationRequired = (req, res, next) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.split(" ")[0] === "Bearer") {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decoded.exp - Math.floor(Date.now() / 1000));
    // check expiration
    if (decoded.exp - Math.floor(Date.now() / 1000) <= 0) {
      res.status(401);
      return res.json({
        status: "fail",
        data: { authorization: "Missing or Invalid Token" }
      });
    }
    next();
  }
  res.status(401);
  return res.json({
    status: "fail",
    data: { authorization: "Missing or Invalid Token" }
  });
};
