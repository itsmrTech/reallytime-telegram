var botgram = require('botgram');
const token = '399005653:AAHCJnysvGT5HIgj1rTfjp6UqDCGvR4Qybc'
var bot = botgram(token);
var context = [];
var chat_id, message_id;
var User = require('./schemas/user')


var db = require('./config/mongoose.js').run();

function jalali() {
    var week = new Array("يكشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه", "شنبه")
    var months = new Array("فروردين", "ارديبهشت", "خرداد", "تير", "مرداد", "شهريور", "مهر", "آبان", "آذر", "دي", "بهمن", "اسفند");
    var a = new Date();
    var d = a.getDay();
    var day = a.getDate();
    var month = a.getMonth() + 1;
    var year = a.getYear();
    year = (year == 0) ? 2000 : year;
    (year < 1000) ? (year += 1900) : true;
    year -= ((month < 3) || ((month == 3) && (day < 21))) ? 622 : 621;
    switch (month) {
        case 1:
            (day < 21) ? (month = 10, day += 10) : (month = 11, day -= 20);
            break;
        case 2:
            (day < 20) ? (month = 11, day += 11) : (month = 12, day -= 19);
            break;
        case 3:
            (day < 21) ? (month = 12, day += 9) : (month = 1, day -= 20);
            break;
        case 4:
            (day < 21) ? (month = 1, day += 11) : (month = 2, day -= 20);
            break;
        case 5:
        case 6:
            (day < 22) ? (month -= 3, day += 10) : (month -= 2, day -= 21);
            break;
        case 7:
        case 8:
        case 9:
            (day < 23) ? (month -= 3, day += 9) : (month -= 2, day -= 22);
            break;
        case 10:
            (day < 23) ? (month = 7, day += 8) : (month = 8, day -= 22);
            break;
        case 11:
        case 12:
            (day < 22) ? (month -= 3, day += 9) : (month -= 2, day -= 21);
            break;
        default:
            break;
    }
    return " " + week[d] + " " + day + "/" + month + "/" + year;
}

function startTime() {
    var today = new Date();
    var h = today.getHours() + 4;
    var m = today.getMinutes() + 29;
    var s = today.getSeconds();
    if (h > 23) {
        h = h % 24;
    }
    if (m > 59) {
        h++;
        m = m % 60;
    }
    m = checkTime(m);
    s = checkTime(s);
    var txt = '🕰 ' +
        h + ":" + m + ' 📆 ' + jalali();
    var request = require('request');
    User.find({}, function (err,found) {

        console.log(found)
        for (var i = 0; i < found.length; i++) {
            var post_data = {
                chat_id: found[i].telegramChat.id,
                message_id: found[i].timeDateMessageId,
                text: txt
            }

            var options = {
                uri: 'https://api.telegram.org/bot' + token + '/editMessageText',
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
    })
    var t = setTimeout(startTime, 60000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
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

    
    User.findOneAndUpdate({
        telegramChat: msg.chat
    }, {
        telegramChat: msg.chat,
        telegramUser: msg.user,
        timeDateMessageId: msg.id + 1
    }, {
        upsert: true,
        new: true
    }, function (err, saved) {
        if (!err) {

        }
    })
    context.push({
        chat_id: msg.chat.id,
        message_id: msg.id + 1
    })

    reply.text("this is the clock");
})
bot.command('clock', function (msg, reply, next) {
    var request = require('request');
    var post_data = {
        chat_id: '113952767',
        message_id: '6',
        from_chat_id: '113952767'
    }

    var options = {
        uri: 'https://api.telegram.org/bot' + token + '/forwardMessage',
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