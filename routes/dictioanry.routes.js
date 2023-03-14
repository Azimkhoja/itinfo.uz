const { Router } = require("express");
const router = Router();
const {
  addDictionary,
  getAllDictionary,
  getDictionary,
  updateDictionary,
  deleteDictionary,
} = require("../controllers/dictionary.conetroller");
const adminPolice = require("../middleware/adminPolice");

router.post("/add",adminPolice,  addDictionary);
router.get('/dict/:id', getDictionary)
router.get("/all", getAllDictionary);
router.put('/:id', adminPolice, updateDictionary)
router.delete('/:id', adminPolice, deleteDictionary)

module.exports = router;
