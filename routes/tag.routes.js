const { Router } = require("express");
const router = Router();
const adminPolice = require("../middleware/adminPolice");
const {
  addTag,
  getAllTag,
  getTag,
  updateTag,
  deleteTag,
} = require("../controllers/tag.controller");

router.post("/add", adminPolice, addTag);
router.get("/all", getAllTag);
router.get("/by/:id", getTag);
router.put("/update/:id", adminPolice, updateTag);
router.delete("/del/:id", adminPolice, deleteTag);

module.exports = router;
