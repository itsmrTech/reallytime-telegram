const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = require('./config/env').token;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on("inline_query", function(query) {
    bot.answerInlineQuery(query.id, [{
      id: '0', 
      type: 'article', 
      title: 'Title', 
      description: 'Markdown', 
      message_text: query.query,
      parse_mode: 'Markdown'
    }]);
});

module.exports=bot