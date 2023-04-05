require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const homeroutes = require("./routes/homeroute");
const searchroutes = require("./routes/searchroute");
const downloadroutes = require("./routes/downloadroute");
const logger = require("./controllers/logger");

const app = express();

app.set('view engine','ejs');
app.use(express.static("public"));

app.use(homeroutes); // routes
app.use(searchroutes);
app.use(downloadroutes);

// -----mongodb-----
mongoose.set('strictQuery', false);
// mongoose.connect(process.env.MONGODBCONNECT)
mongoose.connect("mongodb+srv://greenDock:lab48greenDock@greendock0.hl23w6d.mongodb.net/sam1?retryWrites=true&w=majority")
  .then(()=> console.log("MongoDB connected"))
  .catch(function(err){
    logger.log("error","connection failed : " + err)
});
//--------- server port
app.listen(3000,function(){
  console.log("server is working");
});

//------------ export --------
module.exports = app;
