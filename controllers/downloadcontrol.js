const express = require("express");
const bodyParser = require("body-parser");
const {Parser} = require("json2csv");
const logger = require("../controllers/logger");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const dbdata = require("../models/model");


const get_download = function(req,res){
  res.render("download");
    logger.log("info", "download page");
};

const download = function(req,res){
          dbdata.find({},function(err,found){
            if(err){
                  throw err;
                  logger.error("error", "error occured");
                }
            else{
            const fields = ['id','name', 'rating','review'];
            const opts = { fields };
            const json2csvParser = new Parser(opts);
            const csv = json2csvParser.parse(found);
            res.attachment("mongodata.csv");
            res.send(csv);
              logger.log("info", "downloaded");
          }
      });
};

module.exports = {
    get_download,
    download
};
