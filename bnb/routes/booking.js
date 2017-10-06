var express = require('express');
var router = express.Router();
var crypthelper = require("../helpers/cryptHelper")
var tests = require('../public/json/test.json')
/* GET users listing. */
router.post('/', function (req, res, next) {
  if(!!req.body.script){
      switch (req.body.script) {
          case "get_booking":
              get_booking(req,res);
              break;
          case "set_booking":
              set_booking(req,res);
              break;
      
          default:
              break;
      }

  }else{
      res.status(404)
  }
});


function get_booking(req,res){
    console.log(tests.locations)
    res.send(tests.locations)
}

function set_booking(req,res){

}


module.exports = router;
