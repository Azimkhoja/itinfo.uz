const { errorHandler, checkId } = require("../helpers/error_handler");
const Author = require("../models/Author");
const bcrypt = require("bcryptjs");
const jwt = require("../services/JWTservices");
const config = require("config");
const ApiError = require("../errors/ApiErrors");

const addAuthor = async (req, res) => {
  try {
    const {
      fname,
      lname,
      nicname,
      email,
      phone,
      password,
      info,
      position,
      photo,
      is_expert,
    } = req.body;
    const author = await Author.find({
      fname,
      lname,
      nicname,
      email,
      phone,
      password,
      info,
      position,
      photo,
      is_expert,
    });
    if (!author.length == 0)
      return res.send({
        status: 400,
        message: "This author is already exists",
      });
    const authorHashedPassword = bcrypt.hashSync(password, 7);
    await Author({
      fname,
      lname,
      nicname,
      email,
      phone,
      password: authorHashedPassword,
      info,
      position,
      photo,
      is_expert,
    }).save();
    return res.send({ status: 200, message: "Author registrated!" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const loginAuthor = async (req, res) => {
  try {
    const { nicname, password } = req.body;
    const author = await Author.findOne({ nicname });
    if (!author) return res.status(400).send("wrong nicname or password");

    const validPassword = bcrypt.compareSync(password, author.password);
    if (!validPassword) {
      return res.status(400).send("wrong nicname or password");
    }
    const payload = {
      id: author._id,
      is_expert: author.is_expert,
    }
    const tokens = jwt.generateTokens(payload);
    console.log(tokens);
    res.ok(200, tokens);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    if (checkId(id)) res.send(await Author.findById(id));
    res.send({ status: 500, message: "Invalid author_id entered" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAllAuthor = async (req, res) => {
  try {
    const all_authors = await Author.find();
    if (all_authors.length == 0)
      return res.send({ status: 500, message: "not found" });
    res.send({ status: 200, data: all_authors });
  } catch (error) {
    errorHandler(res, error);
  }
};

const authentification = async (req, res) => {
  try {
    const { anything, password } = req.query;
    let guess_author = await Author.findOne({
      $or: [{ nicname: anything }, { email: anything }, { phone: anything }],
    });
    let author = await Author.findById(guess_author._id);
    if (author != null) {
      const validPassword = bcrypt.compareSync(password, author.password);
      if (!validPassword) {
        return res.status(400).send("wrong password");
      }
      return res.send({ status: 200, message: "welcome to our website" });
    } else res.send({ status: 400, message: "Auhtor not found" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fname,
      lname,
      nicname,
      email,
      phone,
      password,
      info,
      position,
      photo,
      is_expert,
    } = req.body;
    let updated_one;
    let isthere;
    if (checkId(id)) {
      isthere = await Author.findById(id);
      if (isthere != null) {
        updated_one = await Author.findByIdAndUpdate(
          { _id: id },
          {
            fname,
            lname,
            nicname,
            email,
            phone,
            password,
            info,
            position,
            photo,
            is_expert,
          }
        );
      }
    }
    if (isthere !== updated_one)
      res.send({ status: 200, message: "Author updated", data: updated_one });
    else res.send({ status: 300, message: "You have not updated anything." });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    if(id != req.author.id)
      return ApiError.unauthorized(res, {friendlyMsg: "siz bu authorni o'chira olmaysiz "})
    if (checkId(id)) {
      let is_there = await Author.findById(id);
      if (is_there != null)
        res.send({
          status: 200,
          data: await Author.findByIdAndDelete({ _id: id }),
          message: "Author deleted",
        });
      else res.error(500, "there is no author by this id");
    } else res.error(500, "invalid id entered" );
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addAuthor,
  getAuthor,
  getAllAuthor,
  updateAuthor,
  deleteAuthor,
  loginAuthor,
  authentification,
};
