const { Router } = require("express");
const router = Router();
const Validator = require('../middleware/validator')
// const userPolice = require('../middleware/userPolice')
const {
  addUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  userActivate,
  forgetPassword,
  changePassword
} = require("../controllers/user.controller");


router.post("/add", addUser);
router.post("/login",loginUser);
router.get('/cabinet/:temppas', changePassword)

router.get('/forget/:email', forgetPassword)
router.get('/activate/:link', userActivate)
router.get("/all", getAllUser);
router.get("/by/:user_name", getUser);
router.put("/update/:id", updateUser);
router.delete("/del/:id",  deleteUser);

module.exports = router;
