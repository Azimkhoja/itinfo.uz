const { Router } = require("express");
const router = Router();

const {
  addCategory,
  getallCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const adminPolice = require("../middleware/adminPolice");

router.post("/add",adminPolice, addCategory);
router.get("/all", getallCategory);
router.get("/by/:id", getCategory);
router.put("/update/:id",adminPolice, updateCategory);
router.delete("/del/:id", adminPolice, deleteCategory);

module.exports = router;
