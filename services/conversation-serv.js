const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
var constants = require('../utils/constants.json');

const assistant = new AssistantV2({
  version: CONVERSATION_VERSION,
  authenticator: new IamAuthenticator({
    apikey: CONVERSATION_APIKEY,
  }),
  url: CONVERSATION_URL,
});

exports.getConversation = function(pContext) {
    return new Promise(function (resolve, reject) {
        var input = pContext.input;
        var payload = {
            context: input.context,
            input: {
                text: input.question
            }
        };
       
    });
};
