var express = require('express');
var router = express.Router();
var crypthelper = require("../helpers/cryptHelper")

/* GET users listing. */
router.post('/', function (req, res, next) {
  if(!!req.body.name){
    var user = req.body.name
  }else{
    res.status(402);
  }
  if(!!req.body.password){
    var password = req.body.password
  }else{
    res.status(402)
  }
 loggin(user,password,res)
});

function loggin(user, password,res) {
  
  //encryptage du mot de passe
  password = crypthelper.encrypted(password);
  
  res.send([user,password])
}


module.exports = router;
