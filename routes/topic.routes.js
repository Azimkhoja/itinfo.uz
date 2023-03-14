const { Router } = require("express");
const router = Router();
const adminPolice = require("../middleware/adminPolice");
const {
  addTopic,
  getAllTopic,
  getTopic,
  updateTopic,
  deleteTopic,
} = require("../controllers/topic.controller");

router.post("/add", adminPolice, addTopic);
router.get("/all", getAllTopic);
router.get("/by/:id", getTopic);
router.put("/update/:id", adminPolice, updateTopic);
router.delete("/del/:id", adminPolice, deleteTopic);

module.exports = router;
