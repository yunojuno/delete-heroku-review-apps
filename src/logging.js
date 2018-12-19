// general purpose logging functions, used to format log
// output in a consistent format, with PID, level and message, e.g.:
// [25802] DEBUG: Your app is listening on port 3000
const levels = {
  debug: 'DEBUG',
  info: 'INFO',
  warning: 'WARNING',
  error: 'ERROR'
}

function logMessage(level, message){
  console.log(`[${process.pid}] ${level}: ${message}`);
}

function logDebugMessage(message){
  logMessage(levels.debug, message);
}

function logInfoMessage(message){
  logMessage(levels.info, message);
}

function logErrorMessage(message){
  logMessage(levels.error, message);
}

module.exports = {
  debug: logDebugMessage,
  info: logInfoMessage,
  error: logErrorMessage
}
