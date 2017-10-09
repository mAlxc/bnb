var express = require('express');
var router = express.Router();
var crypthelper = require("../helpers/cryptHelper")
var tests = require('../public/json/test.json')
var mongoHelper = require("../helpers/mongoHelper")
var locationHelper = require("../helpers/locationHelper")
/* GET users listing. */
router.post('/', function (req, res, next) {
    if (!!req.body.script) {
        switch (req.body.script) {
            case "get_booking":
                get_booking(req, res);
                break;
            case "set_booking":
                set_booking(req, res);
                break;
            case "get_booking_on":
                get_booking_on(req.body.data, res);
                break;
            default:
            res.send({
                error: {
                    err_code: 400,
                    err_msg: "No script found",
                    err_data : req.body
                }
            })
                break;
        }

    } else {
        res.status(404)
    }
});


function get_booking(req, res) {
    var toto = mongoHelper.getCollection("locations");
    console.log(toto)
    res.send(tests.locations)
}

function get_booking_on(data, res) {
    var result = {}
    res.send(tests.locations)
}

function set_booking(req, res) {

}


module.exports = router;
