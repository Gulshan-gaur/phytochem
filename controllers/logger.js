const {createLogger, format, transports} = require("winston");

const logger = createLogger({
  format: format.combine(
       format.colorize(),
      // format.timestamp({format : 'YYYY-MM-DD HH:mm:ss'}),
       format.json(),
       format.simple(),
       // format.prettyPrint(),
     ),
     transports: [new transports.Console()],
  // meta: true,
  // msg: "HTTP  ",
  // expressFormat: true,
  // colorize: true,
  // ignoreRoute: function (req, res) { return false; }
});

module.exports = logger;
