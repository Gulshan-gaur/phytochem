const express = require("express");
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const dbSchema = new schema({
  _id:{
    $oid: String
  },
  id: String,
  Smiles: String,
  Molecule_Name: String,
  Molecular_Formula: String,
  Molecular_Weight: Number,
  Heavy_Atoms: Number,
  Arom_Heavy_Atoms: Number,
  Fraction_Csp3: Number,
  Rotatable_bonds: Number,
  H_Bond_Acceptors: Number,
  H_Bond_Donors: Number,
  Molar_Refractivity: Number,
  TPSA: Number,
  iLOGP: Number,
  GI_absorption: String,
  BBB_permeant: String,
  P_gp_substrate: String,
  CYP1A2_inhibitor: String,
  CYP2C19_inhibitor: String,
  CYP2C9_inhibitor: String,
  CYP2D6_inhibitor: String,
  CYP3A4_inhibitor: String,
  LogKp: Number,
  Lipinski: Number,
  Ghose: Number,
  Veber: Number,
  Egan: Number,
  Muegge: Number,
  Bioavailability_Score: Number,
  PAINS: Number,
  Brenk: Number,
  Leadlikeness: Number,
  Synthetic_accessibility: Number,
  created_at: Date,
  updated_at: Date,
  ID: String,
  SMILES: String,
  Molecule: String
   });



const Phytochemical= mongoose.model("Phytochemicals",dbSchema);
// const fruit= new Fruit ({name:"apple", rating: 9,review: "noice"});
// fruit.save();


//--------------- exports ------------

module.exports = Phytochemical;

//
// const fruitSchema = new schema({
//   name:{
//      type:String,
//      required:[true,"name required"]
//    },
//      rating:Number
//     ,
//      review:String
//    });
