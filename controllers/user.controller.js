const User = require("../models/User");
const config = require('config');
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("../services/JWTservices");
const mailService = require("../services/MailService");
const ApiError = require('../errors/ApiErrors')
const { errorHandler, checkId } = require("../helpers/error_handler");
const  generator = require('generate-password');

const addUser = async (req, res) => {
  try {
    const { user_name, user_email, user_password, user_info, user_photo } =
      req.body;
    let checkin = await User.findOne({
      user_name,
      user_email,
      user_password,
      user_info,
      user_photo,
    });
    if (checkin != null)
    return res.send({ status: 500, message: "this User is already exists" });
    else {
      const userHashedPassword = bcrypt.hashSync(user_password, 7);
      const user_activation_link = uuid.v4();
      const user = await User({
        user_name,
        user_email,
        user_password: userHashedPassword,
        user_info,
        user_photo,
        user_activation_link
      })
      await user.save();
      await mailService.sendActivationMail(
        user.user_email,
        `${config.get("api_url")}/api/user/activate/${user_activation_link}`
      )
      const payload = {
        user: user._id,
        user: user.user_is_active,
      };
      const tokens = jwt.generateTokens(payload);
  
      user.user_token = tokens.refreshToken;
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: config.get("refresh_ms"),
        httpOnly: true,
      });
      res.ok(200, tokens);
    }
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const forgetPassword = async(req, res) => {
  try {
    const {email} = req.params
    const finduser = await User.findOne({user_email: email})
    if(finduser != null){
      const temp_password = generator.generate({
            length: 6,
            numbers: true,
            lowercase: false
      });
      finduser.user_password = temp_password
      await finduser.save()
      await mailService.sendActivationMail(
        email,
        `${config.get("api_url")}/api/user/cabinet/${temp_password}`
        ) 
      res.ok(200, "email sent")
    }
    res.error(400, "your don't have an account yet")
  } catch (error) {
      ApiError.internal(500, {message: error.message, friendlyMsg: "server error"})
  }
}

const changePassword = async(req, res) => {
  try {
      res.ok(200, "Changed")      
  } catch (error) {
    ApiError.internal(500, {message: error.message, friendlyMsg: "server error"})
  }
}
const userActivate = async(req, res) => {
  try {
    const user = await User.findOne({user_activation_link: req.params.link})
    if(!user){
      return res.error(400, {friendlyMsg: "User topilmadi."})
    }
    if(user.user_is_active){
      return res.error(400, {friendlyMsg: "user is already active"})
    }
    user.user_is_active = true
    await user.save()
    res.ok(200, "user activated")
  } catch (error) {
      errorHandler(res, error)
  }
}
const loginUser = async (req, res) => {
  try {
    const { user_email, password } = req.body;
    let isthere = await User.findOne({ user_email });
    if (!isthere) return res.error(400, "wrong email or password");
    const validPassword = bcrypt.compareSync(password, isthere.user_password);
    if (!validPassword) {      return res.error(400, "wrong email or password");
    }
    res.ok(200, "welcome to our website");
  } catch (error) {
    errorHandler(res, error);
  }
};
const getUser = async (req, res) => {
  try {
    console.log(req);
    const {user_name} = req.params;
    if (checkId(id)) {
      let user = await User.findOne({user_name: user_name});
      console.log(user);
      if (user != null) return res.ok(200, user);
      else return res.error(400, "User not found by this id");
    }
    res.error(500, "invalid User id");
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAllUser = async (req, res) => {
  try {
    const listOfUsers = await User.find();
    if (listOfUsers.length == 0)
      return res.error(400, "User collection is empty");
    else return res.ok(200, listOfUsers);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_name, user_email, user_password, user_info, user_photo } =
      req.body;
    if (checkId(id)) {
      let user = await User.findById(id);
      if (user != null) {
        let update = await User.findByIdAndUpdate(id, {
          user_name,
          user_email,
          user_password,
          user_info,
          user_photo,
        });
        return res.ok(200, update);
      } else return res.error(400, "no User found by this id");
    } else res.error(500, "Invalid id entered");
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (checkId(id)) {
      let user = await User.findById(id);
      if (user != null)
        return res.ok(200, await User.findOneAndDelete(id), "User deleted");
      else return res.error(400, "no User found by this id");
    }
    res.error(500, "Invalid id entered.");
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addUser,
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
  loginUser,
  userActivate,
  forgetPassword,
  changePassword
};
