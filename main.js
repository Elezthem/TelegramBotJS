const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot('ВАШ_ТОКЕН_ТЕЛЕГРАМ_БОТА', {polling: true});

const axios = require('axios');

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome! Begin using the bot.');
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Available commands:\n/help - Get help and list of available commands\n/weather - Get current weather\n/news - Get latest news');
});

bot.onText(/\/weather/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=ВАШ_API_КЛЮЧ`);
    const weatherData = response.data.weather[0];
    bot.sendMessage(chatId, `Weather: ${weatherData.description}`);
  } catch (error) {
    bot.sendMessage(chatId, 'Unable to fetch weather information.');
  }
});

bot.onText(/\/news/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=ВАШ_API_КЛЮЧ`);
    const articles = response.data.articles.slice(0, 5); // Отримати перші 5 новин
    const newsText = articles.map(article => `${article.title}\n${article.url}`).join('\n\n');
    bot.sendMessage(chatId, newsText);
  } catch (error) {
    bot.sendMessage(chatId, 'Unable to fetch news information.');
  }
});

