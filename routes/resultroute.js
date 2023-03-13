const express = require('express');
const searchroute = express.Router();
const bodyParser = require("body-parser");
const searchcontrol = require("../controllers/searchcontrol");

resultroute.use(bodyParser.urlencoded({extended:true}));
resultroute.use(bodyParser.json());


resultroute.post("/result",searchcontrol.result);

model.exports = resultroute;
