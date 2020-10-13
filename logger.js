//App requirements
const trovojs = require('trovo.js');
const client = new trovojs.SocketClient();
const dotenv = require('dotenv');
const fs = require('fs');

//Load env
dotenv.config();

//ReplaceAll Function
function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

//Logger active
client.on('ready', () => {
  console.log("/nLogger Active");
});

//Logger System
client.on('chatMessage' , (msg) => {
  //Date timestamp
  var d = new Date();
  var t = d.toLocaleTimeString();
  var f = d.toLocaleDateString() + '_Chatlog.txt'

  var filename = replaceAll(f, '/', '-')


  //Splitting message responses
  var userName = msg.user
  var message = msg.content
  var userType = msg.badges

  //Set Badge type
  if (userType.includes("sub_")) {
    var userType = '|Subscriber|'
  }else if (userType.includes("moderator")) {
    var userType = '|Moderator|'
  }else if (userType.includes("creator")) {
    var userType = '|Streamer|'
  }

  var log = '[' + t + ']' + ' : ' + userType + ' : ' + userName + ' : ' + message + '\r\n'

  //Consle logging
  console.log(log);

  //Write log to file
  fs.appendFile(filename, log, function (err) {
  if (err) throw err;
});



});

//Bot login method
client.login(process.env.TROVO_URL, process.env.EMAIL, process.env.PASS);
