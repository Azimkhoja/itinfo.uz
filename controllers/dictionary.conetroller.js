const Dictionary = require("../models/Dictionary");
const errorHandler = require("../helpers/error_handler");
const { isValidObjectId } = require("mongoose");
// #addDictionary funksiyasi data bazadagi dictionaries collectioniga #termlarni qoshish boyicha so'rovlarga javob beradi.

const addDictionary = async (req, res) => {
  try {
    const { term } = req.body;
    let check = await Dictionary.findOne({
      term: { $regex: term, $options: "i" },   
    });
    if (check)
        return res.status(500).send({ message: "This term has already added!" });
    let letter = term[0];
    const dictioanry = await Dictionary({ term, letter });
    await dictioanry.save();
    return res.status(200).send({ message: "Dictionary has been added." });
  } catch (error) {
    errorHandler(res, error);
  }
};

// #getallDictionary funksiyasi itinfo database dagi dictionaries collectionidan barcha termlar(IT atamalar)ni qaytarib beradi.
const getAllDictionary = async (req, res) => {
  try {
    const dict = await Dictionary.find({});
    if (dict.length == 0)
      return res.send({ status: 500, message: "nothing is found!" });
    res.send({ status: 200, data: dict });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getDictionary = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !isValidObjectId(id))
      return res.send({ message: "Invalid termID!" });
    const oneTerm = await Dictionary.findById(id);
    res.send({ status: 200, data: oneTerm });
  } catch (error) {
    errorHandler(res, error);
  }
};

// #updateDictionary funksiyasi dictionaries collectionidagi termni yangilaydi.
const updateDictionary = async (req, res) => {
  try {
    const { term } = req.body;
    let { id } = req.params;
    if (!id || !isValidObjectId(id))
      return res.send({ message: "Invalid termID " });
    if (!(await Dictionary.findOne({ term }))) {
      let letter = term[0];
      const updated = await Dictionary.findByIdAndUpdate(
        { _id: id },
        { term, letter }
      );
      res.send({ status: 200, message: "Updated", data: updated });
    } else res.send({ status: 400, message: "this term is already exists" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteDictionary = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !isValidObjectId(id))
      return res.send({ message: "Invalid termID!" });
    let deleted = await Dictionary.findByIdAndDelete(id);
    res.send({ status: 200, message: "Term has been deleted.", data: deleted });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addDictionary,
  getAllDictionary,
  getDictionary,
  updateDictionary,
  deleteDictionary,
};
