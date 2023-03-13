const express = require("express");
const logger = require("../controllers/logger");


// ------------------------  home page -----------------------------
const get_index = function(req,res){
    res.render("index");
    logger.log("info", "home page");
};

// ------------------------ exports  -----------------------------

module.exports = {
    get_index,
};
