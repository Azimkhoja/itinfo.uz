const Description = require("../models/Description");
const { errorHandler, checkId } = require("../helpers/error_handler");

const addDescription = async (req, res) => {
  try {
    const { dict_id, category_id, description } = req.body;
    if (!checkId(dict_id) || !checkId(category_id))
      return res.send({ status: 500, message: "unfullfilled data!" });
    let newDescription = await Description({
      dict_id,
      category_id,
      description,
    });
    await newDescription.save();
    res.send({ status: 200, message: "New data added.", data: newDescription });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAllDescription = async (req, res) => {
  try {
    const all_descriptions = await Description.find({}).populate({
      path: "dict_id",
      select: "term letter -_id",
    }).populate({path: "category_id", select: ""});
    if (all_descriptions.length == 0)
      return res.send({ status: 401, message: "Descriptions not found" });
    res.send({ status: 200, data: all_descriptions });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDescription = async (req, res) => {
  try {
    const { id } = req.params;
    if (!checkId(id))
      return res.send({ status: 500, message: "Error: Invalid id entered!" });
    let desc = await Description.findById(id);
    res.send({ status: 200, data: desc });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateDescription = async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;
    if (!checkId(id))
      return res.send({
        status: 500,
        message:
          "Error: Invalid id entered! while updating descriptions collection",
      });
    const {dict_id, category_id} = await Description.findById(id)
    let new_desc = await Description.findByIdAndUpdate(
      { _id: id },
      { dict_id, category_id, description }
    );
    res.send({ status: 200, message: "Updated!" , data: new_desc});
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteDescription = async (req, res) => {
  try {
    const { id } = req.params;
    if (!checkId(id))
      return res.send({
        status: 500,
        message:
          "Error: Invalid id entered! while updating descriptions collection",
      });
    let del_desc = await Description.findByIdAndDelete(id);
    res.send({ status: 200, message: "deleted", data: del_desc });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addDescription,
  getAllDescription,
  getDescription,
  updateDescription,
  deleteDescription,
};
