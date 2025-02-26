// frontend/src/services/rateService.js
import { v4 as uuidv4 } from 'uuid';

// Базовые курсы валют
const baseRates = {
  'BTC': 0.000038,
  'ETH': 0.00052,
  'BNB': 0.0038,
  'SOL': 0.016,
  'ADA': 0.5,
  'XRP': 0.6,
  'DOGE': 15,
  'TRX': 0.2298
};

// Хранилище для текущих курсов
let currentRates = { ...baseRates };

// Хранилище для подписчиков на обновления курсов
const subscribers = [];

// Настройки скидки
let discountSettings = {
  discountPercentage: 3,
  discountCoin: 'TRX'
};

// Функция для генерации случайного изменения курса (±0.5%)
const generateRandomChange = () => {
  return 1 + (Math.random() * 0.01 - 0.005);
};

// Функция для обновления курсов
const updateRates = () => {
  // Обновляем курсы с небольшим случайным изменением
  Object.keys(currentRates).forEach(coin => {
    currentRates[coin] = baseRates[coin] * generateRandomChange();
  });
  
  // Уведомляем всех подписчиков об обновлении
  notifySubscribers();
  
  console.log('Курсы валют обновлены:', currentRates);
};

// Функция для уведомления подписчиков
const notifySubscribers = () => {
  subscribers.forEach(callback => {
    try {
      callback(getRatesWithDiscount());
    } catch (error) {
      console.error('Ошибка при уведомлении подписчика:', error);
    }
  });
};

// Функция для получения курсов с учетом скидки
const getRatesWithDiscount = () => {
  const rates = { ...currentRates };
  
  // Применяем скидку к выбранной монете
  if (discountSettings.discountCoin && rates[discountSettings.discountCoin]) {
    const discountFactor = 1 / (1 - discountSettings.discountPercentage / 100);
    rates[discountSettings.discountCoin] = rates[discountSettings.discountCoin] * discountFactor;
  }
  
  return rates;
};

// Функция для подписки на обновления курсов
const subscribeToRates = (callback) => {
  subscribers.push(callback);
  
  // Сразу вызываем callback с текущими курсами
  callback(getRatesWithDiscount());
  
  // Возвращаем функцию для отписки
  return () => {
    const index = subscribers.indexOf(callback);
    if (index !== -1) {
      subscribers.splice(index, 1);
    }
  };
};

// Функция для обновления настроек скидки
const updateDiscountSettings = (settings) => {
  discountSettings = {
    ...discountSettings,
    ...settings
  };
  
  // Уведомляем подписчиков о новых курсах с учетом обновленной скидки
  notifySubscribers();
  
  console.log('Настройки скидки обновлены:', discountSettings);
  
  return discountSettings;
};

// Функция для получения текущих настроек скидки
const getDiscountSettings = () => {
  return { ...discountSettings };
};

// Функция для создания нового обмена
const createExchange = (fromCurrency, toCurrency, fromAmount, toAddress) => {
  const rates = getRatesWithDiscount();
  const rate = rates[toCurrency];
  
  // Рассчитываем сумму к получению
  const toAmount = fromAmount * rate;
  
  // Рассчитываем комиссию сервиса (2.5%)
  const serviceFee = fromAmount * 0.025;
  
  // Рассчитываем комиссию сети (фиксированная)
  const networkFee = 0.06;
  
  // Создаем объект обмена
  const exchange = {
    id: uuidv4(),
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    toAddress,
    serviceFee,
    networkFee,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  console.log('Создан новый обмен:', exchange);
  
  return exchange;
};

// Запускаем обновление курсов каждую секунду
setInterval(updateRates, 1000);

// Экспортируем функции
export const rateService = {
  subscribeToRates,
  getRatesWithDiscount,
  getDiscountSettings,
  updateDiscountSettings,
  createExchange
};