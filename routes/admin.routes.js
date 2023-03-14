const { Router } = require("express");
const router = Router();
const Validator = require('../middleware/validator')

const {
  addAdmin,
  getAllAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAdminToken
} = require("../controllers/admin.controller");

router.post("/add", addAdmin);
router.get('/refresh', refreshAdminToken)
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/all", getAllAdmin);
router.get("/by/:id", getAdmin);
router.put("/update/:id", updateAdmin);
router.delete("/del/:id", deleteAdmin);

module.exports = router;
