var botgram = require('botgram');
const token = '441996257:AAFI6BoISHlkQXw4YICXmr9AGk-BU-wjtPA'
var bot = botgram(token);
var context=[];
var chat_id,message_id;


function startTime() {
    var today = new Date();
    var h = today.getHours()+4;
    var m = today.getMinutes()+30;
    var s = today.getSeconds();
    if(h>23){
        h=h%24;
    }
    if(m>59){
        h++;
        m=m%60;
    }
    m = checkTime(m);
    s = checkTime(s);
    var txt ='🕰 '+
    h + ":" + m + ":" + s;
    var request = require('request');
    for(var i=0;i<context.length;i++){
    var post_data={
        chat_id:context[i].chat_id,
        message_id:context[i].message_id,
        text:txt
    }
    
    var options = {
      uri: 'https://api.telegram.org/bot'+token+'/editMessageText',
      method: 'POST',
      json: post_data
    };
    
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body.id) // Print the shortened url.
      }
      console.log(response)
    });
}
    var t = setTimeout(startTime, 1000);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
startTime();
var m = {
    "id": 7,
    "date": "2017-08-25T16:11:38.000Z",
    "chat": {
        "id": 113952767,
        "type": "user",
        "firstname": "mrTech",
        "username": "itsmrtech",
        "name": "mrTech"
    },
    "from": {
        "id": 113952767,
        "type": "user",
        "firstname": "mrTech",
        "username": "itsmrtech",
        "name": "mrTech"
    },
    "forward": {
        "date": "2017-08-25T15:59:05.000Z",
        "from": {
            "id": 441996257,
            "type": "user",
            "firstname": "Clock",
            "username": "Reallytimebot",
            "name": "Clock"
        }
    },
    "user": {
        "id": 113952767,
        "type": "user",
        "firstname": "mrTech",
        "username": "itsmrtech",
        "name": "mrTech"
    },
    "text": "this is the clock",
    "entities": [],
    "type": "text",
    "queued": false
};
bot.text(function (msg, reply, next) {
    m = msg;
    reply.text(JSON.stringify(msg));

})
bot.command('start', function (msg, reply, next) {
    context.push({chat_id:msg.chat.id,
    message_id:msg.id+1})
    
    reply.text("this is the clock");
})
bot.command('clock',function(msg,reply,next){
    var request = require('request');
    var post_data={
        chat_id:'113952767',
        message_id:'6',
        from_chat_id:'113952767'
    }
    
    var options = {
      uri: 'https://api.telegram.org/bot'+token+'/forwardMessage',
      method: 'POST',
      json: post_data
    };
    
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body.id) // Print the shortened url.
      }
      console.log(response)
    });


})