const jwt = require("../services/JWTservices");
const Admin = require("../models/Admin");

module.exports = async function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.send({ status: 403, message: "You do not have an access" });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.send({ status: 403, message: "Please do log in the website" });
    }
    const { id, admin_is_active } = await jwt.verifyAccess(token);
    let is_admin = await Admin.findById(id);
    if (!is_admin || !admin_is_active)
      return res.send({ status: 403, message: "You have not a permission" });
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).send("Auhtor have not signed in 3");
  }
};
