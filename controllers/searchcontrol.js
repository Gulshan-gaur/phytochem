const express = require("express");
const bodyParser = require("body-parser");
const logger = require("../controllers/logger");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

const Phytochemical = require("../models/model");

const get_search = function(req,res){
  res.render("search");
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
    const h_don = req.query.h_donor;
    const h_acc = req.query.h_acceptor;
    const ring =req.query.aro_ring
  var {page =1, limit = 10}=req.query;
  const data = await Phytochemical.find({
    Molecular_weight: { $gt: molwig, $lt: less},
    Aromatic_rings: ring,
    H_bond_donors: h_don,
    H_bond_acceptors: h_acc
  }).limit(limit*1).skip((page-1)*limit).exec();
  var count = await Phytochemical.find({
    Molecular_weight: { $gt: molwig, $lt: less},Aromatic_rings: ring,H_bond_donors: h_don,H_bond_acceptors: h_acc
  }).countDocuments();
  if(count >=200){

  count = 200;
  }
  if(data.length){

      res.render("resultgt",{
        empty:null, molwg: data, totalPages: Math.ceil(count/limit),page: page,
        wg:molwig,less:less,h_donor:h_don,h_acceptor:h_acc,aro_ring:ring});
      logger.log("info","data retrieved");
      }
      else {
        res.render("resultgt",{
          empty : "No data Found", molwg:[],totalPages: Math.ceil(count/limit),page: page,
          wg:molwig,less:less,h_donor:h_don,h_acceptor:h_acc,aro_ring:ring});
        logger.log("warn", "no data found");
      }
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
    molgreater,
};
