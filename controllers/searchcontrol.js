const express = require("express");
const bodyParser = require("body-parser");
const logger = require("../controllers/logger");
// const mongo = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

const Phytochemical = require("../models/model");

const get_search = function(req,res){
  res.render("search",{empty : null, idnn:[]});
    logger.log("info", "search page");
};


const idResult = function(req,res){
      const smile=req.query.smile;

      Phytochemical.find({SMILES:smile},function(err,found,next){
        if(err){
          logger.log("error occured");
          return next(err);
        }
        if(found.length){
          // console.log(found)
          res.render("result",{empty:null,idnn:found});
          logger.log("info", "data retrieved");
        }
        else {
          res.render("result",{empty : "No data Found", idnn:[]});
          logger.log("warn", "no data found");
        }
    });
    // console.log(Phytochemical.find({SMILES:smile}))
};

// const keywordResult = function(req,res){
//       const key=req.body.KEYWORD;
//
//       Phytochemical.find({Molecular_Formula:key},function(err,found,next){
//         if(err){
//           logger.log("error occured");
//           return next(err);
//         }
//         if(found.length){
//           res.render("result",{empty:null,idnn: found});
//           logger.log("info", "data retrieved");
//         }
//         else {
//           res.render("result",{empty : "No data Found", idnn:[]});
//           logger.log("warn", "no data found");
//         }
//     });
// };
//
// const structureResult = function(req,res){
//       const struc=req.body.Structure;
//       Phytochemical.find({Smiles:struc},function(err,found,next){
//         if(err){
//           logger.log("error occured");
//           return next(err);
//         }
//         if(found.length){
//           res.render("result",{empty:null,idnn: found});
//           logger.log("info", "data retrieved");
//         }
//         else {
//           res.render("result",{empty : "No data Found", idnn:[]});
//           logger.log("warn", "no data found");
//         }
//     });
// };
//
//
const molgreater =  async function (req,res){
  try{
    const molwig = req.query.mol_wig;
    const less = req.query.lessthan;
  var {page =1, limit = 10}=req.query;
  const data = await Phytochemical.find({Molecular_weight: { $gt: molwig, $lt: less}}).limit(limit*1).skip((page-1)*limit).exec();
  var count = await Phytochemical.find({Molecular_weight: { $gt: molwig, $lt: less}}).countDocuments();
  if(count >=200){
  count = 200;
  }
      res.render("resultgt",{empty:null, molwg: data, totalPages: Math.ceil(count/limit),page: page,wg:molwig,less:less});
}

catch(err){
  if(err){
    console.log("error occured");
    console.log(err);
  }
}
};

module.exports = {
    get_search,
    idResult,
    // structureResult,
    // keywordResult,
    molgreater
};
