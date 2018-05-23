const jwt = require("jsonwebtoken");

exports.authenticationRequired = (req, res, next) => {
  const authorization = req.get("Authorization");

  if (authorization && authorization.split(" ")[0] === "Bearer") {
    const token = authorization.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      res.status(401);
      return res.json({
        status: "fail",
        data: { authorization: "Missing or Invalid Token" }
      });
    }

    res.locals.id = decoded.data.id;
    return next();
  }

  res.status(401);
  return res.json({
    status: "fail",
    data: { authorization: "Missing or Invalid Token" }
  });
};
