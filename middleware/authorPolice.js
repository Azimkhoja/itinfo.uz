const jwt = require("../services/JWTservices");
module.exports = async function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.send({ status: 403, message: "Author have not signed in 1" });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.send({ status: 403, message: "Author have not signed in 2" });
    }
    [error, decodedData] = await to(jwt.verifyAccess(token));
    if (error) {
      return res.ok(400, { friendlyMsg: error.message });
    }
    req.author = decodedData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).send("Auhtor have not signed in 3");
  }
};

async function to(promise) {
  return promise.then((response) => [null, response]).catch((error) => [error]);
}
