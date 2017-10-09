var mongoHelper = require("./mongoHelper");
var moment = require("moment")

function addNewLoc(data, res) {
    var params = {
        name: data.name
    }
    mongoHelper.findOnewithParams("locations", data, function (result) {
        if (result === null) {
            var loc = {
                name: data.name,
                description: data.description,
                dispo: {
                }
            }
            mongoHelper.insertIn("locations", data, res)
        } else {
            res.send("fail")
        }
    })
}

function getall(data, res) {
    mongoHelper.getCollToArray("locations", null, res)
}

function getWithParams(data, res) {
    var params = {}
    data.params.forEach(function (obj, id) {
        if (obj.type) {
            console.log(obj.type)
            params["description.type"] = obj.type;
        }
        if (obj.ville) {
            params["description.ville"] = obj.ville;
        }
        if (obj.pays) {
            params["description.pays"] = obj.pays;
        }
        if (obj.espace) {
            params["description.espace"] = (!!obj.espace.sup) ? { "$gte": obj.espace.sup } : { "$lte": obj.espace.min };
        }
        if (obj.divers) {
            params["description.divers"] = { $all: obj.divers };
        }
    }, this);
    console.log(params)
    mongoHelper.findInWithParamsToArray("locations", params, null, res)
}

exports.addNewLoc = addNewLoc;
exports.getall = getall;
exports.getWithParams = getWithParams;