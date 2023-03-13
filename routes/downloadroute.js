const express = require('express');
const downloadroute = express.Router();
const bodyParser = require("body-parser");
const downloadcontrol = require("../controllers/downloadcontrol");

downloadroute.use(bodyParser.urlencoded({extended:true}));
downloadroute.use(bodyParser.json());

downloadroute.get("/download",downloadcontrol.get_download);     // req download page

downloadroute.post("/download",downloadcontrol.download); // res download csv file button

module.exports = downloadroute;
