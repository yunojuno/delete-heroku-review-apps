// module for sending Slack channel notifications
const { WebClient } = require("@slack/client");
const token = process.env.SLACK_TOKEN;
const logging = require('./logging');

const web = new WebClient(token);

/** Post a message to a Slack channel

@param {string} channel - Slack channel name
@param {Object} message - the message to send (may include HTML)

@returns {bool} true if the message was sent.

API: https://api.slack.com/methods/chat.postMessage
*/
async function sendChannelMessage(channel, message) {
  web.chat
    .postMessage({
      channel: channel,
      text: message,
      as_user: false,
      icon_url: "https://avatars2.githubusercontent.com/u/37938564?s=75",
      username: "Junobot"
    })
    .then(resp => {
      logging.debug(resp);
      return resp.ok;
    })
    .catch(error => {
      logging.error(error);
      return false;
    });
};

async function sendMessage(message) {
  return sendChannelMessage(process.env.SLACK_CHANNEL, message);
};

module.exports = {
  sendChannelMessage: token ? sendChannelMessage : logging.info,
  sendMessage: token ? sendMessage : logging.info
};
