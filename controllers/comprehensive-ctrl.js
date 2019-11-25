var common = require('../utils/common');
var constants = require('../utils/constants.json');
var Rx = require('rxjs/Rx');

exports.getDialogue = function(req, res, next) {
    req.session.user = 'admin';
    var context = {
        input: req.body.input
    };
   
}
