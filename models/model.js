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
  PubChem_CID:Number,
  Reference:String,
  Molecular_formula: String,
  Molecular_weight: Number,
  TPSA: Number,
  Logp:Number,
  H_bond_donors: Number,
  H_bond_acceptors: Number,
  Rotatable_bonds :Number,
  Aromatic_rings: Number,
  GI_absorption: String,
  BBB_permeant: String,
  Lipinski: Number,
  Bioavailability_Score: Number,
  Leadlikeness: String,
   });
   
   
const Phytochemical= mongoose.model("phytochems",dbSchema);

//--------------- exports ------------

module.exports = Phytochemical;
