const express = require('express');
const homeroute = express.Router();
const bodyParser = require("body-parser");
const homecontrol = require("../controllers/homecontrol");

homeroute.use(bodyParser.urlencoded({extended:true}));
homeroute.use(bodyParser.json());



homeroute.get("/",homecontrol.get_index);    // req index page

homeroute.get("/about-us", homecontrol.aboutUs)  // req home page


module.exports = homeroute;
