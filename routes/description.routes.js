const { Router } = require("express");
const router = Router();

const {
  addDescription,
  getAllDescription,
  getDescription,
  updateDescription,
  deleteDescription,
} = require("../controllers/description.controller");
const adminPolice = require("../middleware/adminPolice");

router.post("/add",adminPolice,  addDescription);
router.get("/all", getAllDescription);
router.get('/by/:id', getDescription)
router.put('/update/:id',adminPolice, updateDescription)
router.delete('/del/id',adminPolice, deleteDescription)

module.exports = router;
