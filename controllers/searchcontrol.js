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
      const smile=req.body.smile;

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
// const molgreater =  async function (req,res){
//   try{
//   const {page =1, limit = 10}=req.query;
//   const molwig = req.body.MOLWIG;
//
//   const count = await Phytochemical.find({Molecular_Weight: { $gt: molwig}}).countDocuments();
//   const data = await Phytochemical.find({Molecular_Weight: { $gt: molwig}},function(err,found,next){
//
//     console.log(count);
//     if(found.length){
//       res.render("resultgt",{empty:null,molwg: found, totalPages: Math.ceil(count/limit),currentpage: page});
//       logger.log("info", "data retrieved");
//     }
//     else {
//       res.render("resultgt",{empty : "No data Found", molwg:[]});
//       logger.log("warn", "no data found");
//     }
// }).limit(limit*1).skip((page-1)*limit).exec();
//
//
// }
//
// catch(err){
//   if(err){
//     logger.log("error occured");
//     return next(err);
//   }
// }
// };

module.exports = {
    get_search,
    idResult,
    // structureResult,
    // keywordResult,
    // molgreater
};
