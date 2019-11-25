var common = require('../utils/common');
var constants = require('../utils/constants.json');
var conversationServ = require('../services/conversation-serv');
var Rx = require('rxjs/Rx');

exports.getDialogue = function(req, res, next) {
    req.session.user = 'admin';
    var context = {
        input: req.body.input
    };
    Rx.Observable.fromPromise(conversationServ.getConversation(context)).flatMap(pContext => {
        if (!pContext.input.source) {
            return null;
        } else {
            return Rx.Observable.of(pContext);
        }
    }).flatMap(pContext => {
        if (!pContext.input.source) {
            return null;
        } else {
            return Rx.Observable.of(pContext);
        }
    }).flatMap(pContext => {
        return Rx.Observable.fromPromise(cloudantServ.insertHistory(pContext));
    }).map(pContext => {
        res.json(pContext.input);
    }).catch(err => {
        res.status(500).send(err);
    }).subscribe();
}
