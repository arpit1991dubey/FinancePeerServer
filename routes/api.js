const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

/* ---------------------------------- model --------------------------------- */

const User = require("../models/user");

/* ---------------------------------- func --------------------------------- */

const getFiles = async(req, res, next) => {
  try {
    let users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
}

const uploadFiles = async(req, res, next) => {
  try {
    // upload file
    dataFile = req.files.file;
    uploadPath = path.resolve(__dirname, "../uploads/data.json");
    await dataFile.mv(uploadPath);

    // parse file
    let rawData = fs.readFileSync(uploadPath);
    let data = JSON.parse(rawData);

    // save in database
    await User.insertMany(data);

    // send respose
    let users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
}

/* ------------------------------- upload file ------------------------------ */

router.route("/upload").post(uploadFiles)

router.route("/users").get(getFiles)



module.exports = router;
