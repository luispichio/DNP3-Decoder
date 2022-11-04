const { execFileSync } = require('node:child_process');
var express = require('express');
var logger = require('morgan');
//-----------------------------------------------------------------------------
var app = express();
app.use(logger('dev'));
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//-----------------------------------------------------------------------------
app.post("/decode", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  let { body } = req;
  let results = [];  
  //console.log(body);
  if (body && body.length > 0) {
    let lines = body.split("\n");
    const re = /05(?:[0-9A-Fa-f]{2})+/g;
    for (let line of lines) {
      if (line.length > 0) {
        let lineResult = {
          line,
          decoded: [],
        };
        try {
          hexContentsIt = line.matchAll(re);
          for (let hexContents of hexContentsIt){
            for (let hex of hexContents){
              let input = Buffer.from(hex, 'hex');
              let stdout = execFileSync(__dirname + '/decoder', { input });
              lineResult.decoded.push({ hex, decoded: stdout.toString('utf8')});
            }
          }
        } catch (error) {
          console.error(error);
        }
        results.push(lineResult)
      }
    }
  }
  //res.render('result', { results });  
  res.json(results);
});
//-----------------------------------------------------------------------------
module.exports = app;
