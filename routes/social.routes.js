const { Router } = require("express");
const router = Router();
const {
  addSocial,
  getSocial,
  getAllSocial,
  updateSocial,
  deleteSocial,
} = require("../controllers/social.controller");
router.post("/add", addSocial);
router.get("/by/:id", getSocial);
router.get("/all", getAllSocial);
router.put("/update/:id", updateSocial);
router.delete('/del/:id', deleteSocial)

module.exports = router;
