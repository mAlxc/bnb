var express = require('express');
var router = express.Router();
var crypthelper = require("../helpers/cryptHelper")
var tests = require("../public/json/users.json")

/* GET users listing. */
router.post('/', function (req, res, next) {
  if (!!req.body.script) {
    switch (req.body.script) {
      case "login":
        loggin(req.body.data, res)
        break;

      default:
        break;
    }
  } else {
    res.status(402)
    res.end()
  }

});

function loggin(data, res) {

  if (!!data.name) {
    var user = data.name
  } else {
    res.status(404);
    res.end();
    return
  }
  if (!!data.password) {
    var password = data.password
  } else {
    res.status(404)
    res.end();
    return
  }
  //encryptage du mot de passe
  password = crypthelper.encrypted(data.password);
  for (element in tests.users) {
    if (tests.users[element].name === data.name) {
      if (tests.users[element].password === password) {
        res.send("Succefull auth");
        return null;
      } else {
        res.send("Wrong user/password");
        return null;
      }
    }
  }
  res.send("Wrong user/password");
}


module.exports = router;
