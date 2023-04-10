const express = require('express');
const searchroute = express.Router();
const bodyParser = require("body-parser");
const searchcontrol = require("../controllers/searchcontrol");

searchroute.use(bodyParser.urlencoded({extended:true}));
searchroute.use(bodyParser.json());


searchroute.get("/search",searchcontrol.get_search);    // req search page -AND- data for search

searchroute.get("/idresult",searchcontrol.idResult);       // res search for data and give output

// searchroute.post("/keywrdresult",searchcontrol.keywordResult);
//
// searchroute.post("/structureresult",searchcontrol.structureResult);       // res search for data and give output
//
searchroute.get("/molres",searchcontrol.molgreater);



module.exports = searchroute;
