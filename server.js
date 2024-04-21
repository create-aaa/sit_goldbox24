const express = require('express');
const app = express();
const port = 5174;
const bodyParser = require('body-parser');

require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_KEY;
const chatId = process.env.CHAT_ID;
const bot = new TelegramBot(token, { polling: true });

const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sendMessageToBot = (
  adenaQty,
  nickname,
  email,
  price,
  currency,
  server,
  serverTab,
  date,
  paymentSystem
) => {
  const message = `✅ Отримано новий платіж через ${paymentSystem}
    ------------------------------------------------------------------
    Кількість адени: ${adenaQty},
    Нікнейм: ${nickname},
    Поштова скриня: ${email},
    Ціна: ${price},
    Валюта: ${currency},
    Сервер: [${serverTab}] ${server},
    Час: ${date},
    Платіжна система: ${paymentSystem}
  `;

  bot.sendMessage(chatId, message);
};

bot.onText(/Capture/, function (msg) {
  var chatId = msg.chat.id;
  console.log(chatId);
  bot.sendMessage(chatId, `Captured, chatId - ${chatId}`);
});

app.get('/', (req, res) => {
  res.send(process.env.TELEGRAM_KEY);
});

// bot.onText(/\/start/, function (msg, match) {
//   let chatId = msg.chat.id;
//   let fromId = msg.from.id; // store that value and use it as param on sendMessage()
//   var name = msg.from.first_name;
//   bot.sendMessage(fromId, `Welcome dear ${name} have fun`);
//   console.log(fromId);
// });

app.post('/paypalPayment', (req, res) => {
  console.log(req.body);
  const {
    adenaQty,
    nickname,
    email,
    price,
    currency,
    server,
    serverTab,
    date,
    paymentSystem,
  } = req.body;

  sendMessageToBot(
    adenaQty,
    nickname,
    email,
    price,
    currency,
    server,
    serverTab,
    date,
    paymentSystem
  );
});

app.listen(port, console.log(`server start at ${port}`));
