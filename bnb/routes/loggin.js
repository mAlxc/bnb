var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
  //var user = req.params.user
 // var password = req.params.password
  res.send('respond with a resource');
});

function loggin(user, password) {
  console.log(user,password)
}


module.exports = router;
