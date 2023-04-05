const express = require("express");
const logger = require("../controllers/logger");


// ------------------------  home page -----------------------------
const get_index = function(req,res){
    res.render("index");
    logger.log("info", "home page");
};

const aboutUs = function(req,res){
  res.render("about-us");
}

// ------------------------ exports  -----------------------------

module.exports = {
    get_index,
    aboutUs
};
