var common = require('../utils/common');
var constants = require('../utils/constants.json');
var Rx = require('rxjs/Rx');

exports.getDialogue = function(req, res, next) {
    req.session.user = 'admin';
    var context = {
        input: req.body.input
    };
   
    Rx.Observable.fromPromise(conversationServ.getConversation(context)).flatMap(pContext => {
        if (!pContext.input.source) {
            return Rx.Observable.fromPromise(nlcServ.getClassifier(pContext));
        } else {
            return Rx.Observable.of(pContext);
        }
    }).map(pContext => {
        res.json(pContext.input);
    }).catch(err => {
        res.status(500).send(err);
    }).subscribe();
}
