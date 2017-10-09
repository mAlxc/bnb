var mongoHelper = require("./mongoHelper");
var crypthelper = require("./cryptHelper")

function newuser(data, res) {
    if (data.username && data.name && data.password && data.mail && data.firstName) {
        var params = {
            username: data.username
        }
        mongoHelper.findOnewithParams("users", params, function (results) {
            if (results != null) {
                res.send({
                    error: {
                        err_code: 400,
                        err_msg: "Cet username existe deja"
                    }
                })
            } else {
                //pas d'username deja present avec ce nom

                cryptPass = crypthelper.encrypted(data.password)
                var user = {
                    username: data.username,
                    password: cryptPass,
                    name: data.name,
                    firstName: data.firstName,
                    mail: data.mail
                }
                mongoHelper.insertIn("users", user, res);
            }
        }, null);
    } else {
        res.send({
            error: {
                err_code: 400,
                err_msg: "informations incompletes"
            }
        })
    }
}



function login(data, res) {
    //encryptage du mot de passe
    password = crypthelper.encrypted(data.password);
    var params = {
        name: data.name
    }
    mongoHelper.findInWithParamsToArray("users", params, null, res);
}

exports.login = login;
exports.newuser = newuser;