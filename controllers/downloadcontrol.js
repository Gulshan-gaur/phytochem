const logger = require("../controllers/logger");
const get_download = function(req,res){
  res.render("download");
    logger.log("info", "download page");
};


module.exports = {
    get_download
};
