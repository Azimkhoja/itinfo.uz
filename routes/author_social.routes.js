const { Router } = require("express");
const router = Router();

const {
  addAuthorSocial,
  getAllAuthorSocial,
  getAuthorSocial,
  updateAuthorSocial,
  deleteAuthorSocial,
} = require("../controllers/author_social.controller");

router.post("/add", addAuthorSocial);
router.get("/all", getAllAuthorSocial);
router.get("/by/:id", getAuthorSocial);
router.put("/update/:id", updateAuthorSocial);
router.delete("/del/:id", deleteAuthorSocial);

module.exports = router;
