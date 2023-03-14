const { Router } = require("express");
const router = Router();
const authorPolice = require('../middleware/authorPolice')
const authorRolePolice = require('../middleware/authorRolePolice')
const {
  addAuthor,
  getAuthor,
  getAllAuthor,
  updateAuthor,
  deleteAuthor,
  loginAuthor,
  authentification,
} = require("../controllers/author.controller");
router.post("/add", addAuthor);
router.post("/login", loginAuthor);
router.get("/authentication", authentification);
router.get("/by/:id",authorRolePolice(["CHANGE"]), getAuthor);
router.get("/all",authorPolice, getAllAuthor);
router.put("/update/:id", updateAuthor);
router.delete('/del/:id',authorPolice,  deleteAuthor)

module.exports = router;
