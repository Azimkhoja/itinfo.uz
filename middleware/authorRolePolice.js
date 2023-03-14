const jwt = require("jsonwebtoken");

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const authorization = req.headers.authorization;
      if (!authorization) {
        return res.error(403, "Author have not signed in 1");
      }
      const token = authorization.split(" ")[1];
      if (!token) {
        return res.error(403, "Author have not signed in 2");
      }
      const { authorRoles } = jwt.verify(token, "secret");
      console.log(authorRoles);

      let hasrole = false;
      authorRoles.forEach((authorRole) => {
        if (roles.includes(authorRole)) hasrole = true;
      });
      if (!is_expert || !hasrole)
        return res.send(403, "You have not a permission");
      next();
    } catch (error) {
      console.log(error);
      return res.error(403, "Auhtor have not signed in 3");
    }
  };
};
