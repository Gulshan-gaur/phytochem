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


// const idResult = function(req,res){
      // const smile=req.query.smile;

      // Phytochemical.find({SMILES:smile},function(err,found,next){
        // if(err){
          // logger.log("error occured");
          // return next(err);
        // }
        // if(found.length){
          // res.render("result",{empty:null,idnn:found});
          // logger.log("info", "data retrieved");
        // }
        // else {
          // res.render("result",{empty : "No data Found", idnn:[]});
          // logger.log("warn", "no data found");
        // }
    // });
    // console.log(Phytochemical.find({SMILES:smile}))
// };
const idResult = function(req, res) {
  const smile = req.query.smile;
  const pubchem_cid = req.query.pubchem_cid;
  const mol_formula = req.query.mol_formula;
  if (smile) {
    Phytochemical.find({ SMILES: smile }, function(err, found, next) {
      if (err) {
        logger.log('error occurred');
        return next(err);
      }
      if (found.length) {
        res.render('result', { empty: null, idnn: found });
        logger.log('info', 'data retrieved');
      } else {
        res.render('result', { empty: 'No data Found', idnn: [] });
        logger.log('warn', 'no data found');
      }
    });
  } else if (pubchem_cid) {
    Phytochemical.find({ PubChem_CID: pubchem_cid }, function(err, found, next) {
      if (err) {
        logger.log('error occurred');
        return next(err);
      }
      if (found.length) {
        res.render('result', { empty: null, idnn: found });
        logger.log('info', 'data retrieved');
      } else {
        res.render('result', { empty: 'No data Found', idnn: [] });
        logger.log('warn', 'no data found');
      }
    });
  } else if (mol_formula) {
    Phytochemical.find({ Molecular_formula: mol_formula }, function(err, found, next) {
      if (err) {
        logger.log('error occurred');
        return next(err);
      }
      if (found.length) {
        found = found.slice(0, 3);
        res.render('result', { empty: null, idnn: found});
        logger.log('info', 'data retrieved');
      } else {
        res.render('result', { empty: 'No data Found', idnn: [] });
        logger.log('warn', 'no data found');
      }
    });
  } else {
    res.render('result', { empty: 'Invalid query type', idnn: [] });
    logger.log('warn', 'invalid query type');
  }
};
const molgreater =  async function (req,res){
  try{
    const molwig = req.query.mol_wig;
    const less = req.query.lessthan;
    const h_don = req.query.h_donor;
    const h_acc = req.query.h_acceptor;
    const ring =req.query.aro_ring
    var {page =1, limit = 10}=req.query;
    const query = {
      Molecular_weight: { $gt: parseFloat(molwig), $lt: parseFloat(less) },
    };
    if (h_don) {
      query.H_bond_donors = parseInt(h_don);
    }

    if (h_acc) {
      query.H_bond_acceptors = parseInt(h_acc);
    }
    if (ring){
      query.Aromatic_rings= parseInt(ring);
    }

    const data = await Phytochemical.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    let count = await Phytochemical.countDocuments(query);
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
    console.log(err)
  }
  }
};


module.exports = {
  get_search,
  idResult,
  molgreater
};
