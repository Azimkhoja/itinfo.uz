const Admin = require("../models/Admin");
const { errorHandler, checkId } = require("../helpers/error_handler");
const bcrypt = require("bcryptjs");
const jwt = require("../services/JWTservices");
const config = require("config");

const addAdmin = async (req, res) => {
  try {
    const {
      admin_name,
      admin_email,
      admin_password,
      admin_is_active,
      admin_is_creator,
    } = req.body;
    let checkin = await Admin.findOne({
      admin_name,
      admin_email,
      admin_password,
      admin_is_active,
      admin_is_creator,
    });
    if (checkin != null)
      return res.error(400, { friendlyMsg: "this admin is already exists" });
    else {
      const adminHashedPassword = bcrypt.hashSync(admin_password, 7);
      await Admin({
        admin_name,
        admin_email,
        admin_password: adminHashedPassword,
        admin_is_active,
        admin_is_creator,
      }).save();
    }
    res.ok(200, "Admin successfully added.");
  } catch (error) {
    errorHandler(res, error);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { admin_email, password } = req.body;
    let admin = await Admin.findOne({ admin_email });
    if (!admin)
      return res.error(400, { friendlyMsg: "wrong email or password" });
    const validPassword = bcrypt.compareSync(password, admin.admin_password);
    if (!validPassword) {
      return res.error(400, { friendlyMsg: "wrong email or password" });
    }
    const payload = {
      id: admin._id,
      admin_is_active: admin.admin_is_active,
      admin_is_creator: admin.admin_is_active,
    };
    const tokens = jwt.generateTokens(payload);

    admin.admin_token = tokens.refreshToken;
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
    res.ok(200, tokens);
  } catch (error) {
    errorHandler(res, error);
  }
};

const logoutAdmin = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    console.log(refreshToken);
    let admin;
    if (!refreshToken)
      return res.error(400, { friendlyMsg: "Token not found" });
    admin = await Admin.findOneAndUpdate(
      { admin_token: refreshToken },
      { admin_token: "" },
      { new: true }
    );
    if (!admin) return res.error(400, { friendlyMsg: "Token not found" });
    res.clearCookie("refreshtoken");
    res.ok(200, admin);
  } catch (error) {
    errorHandler(res, error);
  }
};

const refreshAdminToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return res.error(400, { friendlyMsg: "Token not found" });
    const adminDataFromCookie = await jwt.verifyRefresh(refreshToken);

    const adminDataFromDB = await Admin.findOne({ admin_token: refreshToken });
    if (!adminDataFromCookie || !adminDataFromDB) {
      return res.error(400, { friendlyMsg: "Admin ro'yxatdan o'tmagan" });
    }
    const admin = await Admin.findById(adminDataFromCookie.id);
    if (!admin) return res.error(400, { friendlyMsg: "Wrong id" });

    const payload = {
      id: admin._id,
      admin_is_active: admin.admin_is_active,
      admin_is_creator: admin.admin_is_active,
    };
    const tokens = jwt.generateTokens(payload);

    admin.admin_token = tokens.refreshToken;
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
    res.ok(200, tokens);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (checkId(id)) {
      let admin = await Admin.findById(id);
      if (admin != null) return res.ok(200, admin);
      else return res.error(400, { friendlyMsg: "Admin not  by this id" });
    }
    res.error(400, { friendlyMsg: "invalid Admin id" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const listOfAdmins = await Admin.find();
    if (listOfAdmins.length == 0)
      return res.error(400, { friendlyMsg: "Admin collection is empty" });
    else return res.ok(200, listOfAdmins);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      admin_name,
      admin_email,
      admin_password,
      admin_is_active,
      admin_is_creator,
    } = req.body;
    if (checkId(id)) {
      let admin = await Admin.findById(id);
      if (admin != null) {
        let admin = await Admin.findByIdAndUpdate(id, {
          admin_name,
          admin_email,
          admin_password,
          admin_is_active,
          admin_is_creator,
        });
        return res.ok(200, admin);
      } else
        return res.error(400, { friendlyMsg: "no admin found by this id" });
    } else res.error(400, { friendlyMsg: "Invalid id entered" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (checkId(id)) {
      let admin = await Admin.findById(id);
      if (admin != null) {
        let admin = await Admin.findOneAndDelete(id);
        return res.ok(200, { admin, message: "Admin deleted" });
      } else
        return res.error(400, { friendlyMsg: "no admin found by this id" });
    }
    res.error(400, { friendlyMsg: "Invalid id entered." });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addAdmin,
  getAdmin,
  getAllAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAdminToken,
};
