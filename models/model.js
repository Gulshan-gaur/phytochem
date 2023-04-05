const express = require("express");
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const dbSchema = new schema({
  _id:{
    $oid: String
  },
  SMILES: String,
  Molecule_name: String,
  IUPAC_name:String,
  PubChem_CID:String,
  Molecular_formula: String,
  Molecular_weight: String,
  GI_absorption: String,
  BBB_permeant: String,
  Lipinski: Number,
  Bioavailability_Score: String,
  Leadlikeness: String,
   });   
   
   
   
   
   
   
   
   


const Phytochemical= mongoose.model("phytochems",dbSchema);
// const fruit= new Fruit ({name:"apple", rating: 9,review: "noice"});
// fruit.save();


//--------------- exports ------------

module.exports = Phytochemical;
