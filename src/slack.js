const { WebClient } = require("@slack/client");
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

/** Post a message to a Slack channel

@param {string} channel - Slack channel name
@param {Object} message - the message to send (may include HTML)

@returns {bool} true if the message was sent.

API: https://api.slack.com/methods/chat.postMessage
*/
const sendChannelMessage = async (channel, message) => {
    web.chat
        .postMessage({
            channel: channel,
            text: message,
            as_user: false,
            icon_url: "https://avatars2.githubusercontent.com/u/37938564?s=75",
            username: "Junobot"
        })
        .then(resp => {
            console.log(resp);
            return resp.ok;
        })
        .catch(error => {
            console.log(error);
            return false;
        });
};

module.exports = {
    sendChannelMessage: token ? sendChannelMessage : console.log
};
