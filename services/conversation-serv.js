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
        assistant.message(payload, function(err, data) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                var input = pContext.input;
                input.context = data.context;
                if (data.output.next_step === constants.conversation_step.answer) {

                } else if (data.output.next_step === constants.conversation_step.contact) {
                    pContext.qa = data.output.go_qa;
                } else {
                    input.answer = data.output.text.join();
                    input.source = '1';
                }
                resolve(pContext);
            }
        });
    });
};
