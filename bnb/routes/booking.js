var express = require('express');
var router = express.Router();
var crypthelper = require("../helpers/cryptHelper")

/* GET users listing. */
router.post('/', function (req, res, next) {
  if(!!req.body.script){
      switch (req.body.script) {
          case "get_book":
              
              break;
      
          default:
              break;
      }

  }else{
      res.status(404)
  }
});

function loggin(user, password,res) {
  
  //encryptage du mot de passe
  password = crypthelper.encrypted(password);
  
  res.send([user,password])
}


module.exports = router;
