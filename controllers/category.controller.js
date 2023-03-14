const Category = require("../models/Category");
const errorHandler = require("../helpers/error_handler");
const {isValidObjectId} = require('mongoose')

const addCategory = async (req, res) => {
  try {
    const { category_name, parent_category_id } = req.body;
    let check = await Category.findOne({
      category_name: { $regex: category_name, $options: "i" }});
    if (check)
        return res.send({
        status: 500,
        message: "This category name is already exists!"});
    if (!isValidObjectId(parent_category_id))
      res.send({status: 500, message: "parent_category_id:  is not valid!" });
    const newCategory = await Category({ category_name, parent_category_id });
    await newCategory.save();
    res.send({status:200, message: "category is saved"})
  } catch (error) {
    errorHandler(res, error);
  }
};

const getallCategory = async(req, res) => {
  try {
      const all_category = await Category.find({})
      if(all_category.length ==0) return res.send({status: 400, message: "the collection of category is empty"})
      res.send({status: 200, data: all_category})
    } catch (error) {
      errorHandler(res, error)
  }
}
// #categories colelctionidan id si boyicha categorylarni topib beradi
const getCategory = async(req, res) => {
    try {
        const {id} = req.params
        let check = isValidObjectId(id)  // id yaroqli yoki yaroqsizligini topadigan buil-in function true|false qaytaradi
        if(!check || !id) return res.send({status: 500, message: "Invalid category_id"})
        let category = await Category.findById(id)
        res.send({status: 200, data: category})

    } catch (error) {
        errorHandler(res, error)
    }
}

const updateCategory = async(req, res) => {
    try {
        const {id} = req.params
        const {category_name, parent_category_id } = req.body;
        let check_category = await Category.findOne({
          category_name: { $regex: category_name, $options: "i" }});
        let check = isValidObjectId(id)                               // id yaroqli yoki yaroqsizligini topadigan buil-in function true|false qaytaradi
        if(!check || !id) return res.send({status: 500, message: "Invalid category_id while updating category_name"})
        if(check_category) return res.send({status:400, updated: false, message: "your updated category_name is already exists"})
        let updated_category = await Category.findByIdAndUpdate({_id: id}, {category_name, parent_category_id})
        res.send({status: 200, updated: true, data: updated_category})
    } catch (error) {
        errorHandler(res, error)
    }
}

// #deleteCategory funksiyasi categories collectionidan berilgan id boyicha malumotni o'chiradi.
const deleteCategory = async(req, res) => {
    try {
      const {id} = req.params
      let check = isValidObjectId(id)                               // id yaroqli yoki yaroqsizligini topadigan buil-in function true|false qaytaradi
      if(!check || !id) return res.send({status: 500, message: "Invalid category_id while deleting  category_name"})
      const delCat  = await Category.findByIdAndDelete(id)
      res.send({status: 200, deleted: true, message:"category_name is deleted!"})
    } catch (error) {
        errorHandler(res, error)
    }
}
module.exports = {
  addCategory,
  getallCategory,
  getCategory,
  updateCategory,
  deleteCategory
};
