// Сервис для работы с курсами валют (хранение в памяти)
const rates = {
    'USDT_BTC': 0.000037,
    'USDT_ETH': 0.00052,
    'USDT_BNB': 0.0037,
    'USDT_SOL': 0.0125,
    'USDT_ADA': 0.5,
    'USDT_XRP': 0.6,
    'USDT_DOGE': 15
  };
  
  // Имитация обновления курсов каждые 30 секунд
  setInterval(() => {
    Object.keys(rates).forEach(pair => {
      // Случайное изменение курса в пределах ±2%
      const change = 1 + (Math.random() * 0.04 - 0.02);
      rates[pair] = rates[pair] * change;
    });
    
    // Уведомляем подписчиков об изменении курсов
    if (subscribers.length > 0) {
      subscribers.forEach(callback => callback(rates));
    }
  }, 30000);
  
  // Подписчики на обновления курсов
  const subscribers = [];
  
  export const rateService = {
    // Получить курс обмена с учетом комиссии 3%
    getExchangeRate: (fromCurrency, toCurrency) => {
      const pair = `${fromCurrency}_${toCurrency}`;
      const baseRate = rates[pair] || 0;
      // Применяем комиссию 3%
      return baseRate * 0.97;
    },
    
    // Получить все курсы
    getAllRates: () => {
      return { ...rates };
    },
    
    // Подписаться на обновления курсов
    subscribeToRates: (callback) => {
      subscribers.push(callback);
      return () => {
        const index = subscribers.indexOf(callback);
        if (index !== -1) {
          subscribers.splice(index, 1);
        }
      };
    },
    
    // Обновить курс (для админ-панели)
    updateRate: (fromCurrency, toCurrency, newRate) => {
      const pair = `${fromCurrency}_${toCurrency}`;
      rates[pair] = newRate;
      return true;
    }
  };