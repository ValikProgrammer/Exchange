// Сервис для работы с обменами (хранение в памяти)
let exchanges = [];
let nextId = 1;

// Адреса депозитов для разных валют
const depositAddresses = {
  'USDT': '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  'BTC': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  'ETH': '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  'BNB': 'bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2',
  'SOL': '8ZUgm2XQFXcdUFBQffVpyJQZQJYxpJH7j7SBdBnKX8Yn',
  'ADA': 'addr1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  'XRP': 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
  'DOGE': 'D8vFz4p1L37jdg9xpmmqrL8xk62TTWMNiT'
};

export const exchangeService = {
  // Создать новый обмен
  createExchange: (exchangeData) => {
    const id = nextId++;
    const timestamp = new Date().toISOString();
    
    const exchange = {
      id: id.toString(),
      ...exchangeData,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    exchanges.push(exchange);
    
    // Имитация автоматического обновления статуса через 1 минуту
    setTimeout(() => {
      const index = exchanges.findIndex(e => e.id === exchange.id);
      if (index !== -1) {
        exchanges[index].status = 'completed';
        exchanges[index].updatedAt = new Date().toISOString();
      }
    }, 60000);
    
    return exchange;
  },
  
  // Получить обмен по ID
  getExchangeById: (id) => {
    return exchanges.find(exchange => exchange.id === id) || null;
  },
  
  // Получить все обмены
  getAllExchanges: () => {
    return [...exchanges];
  },
  
  // Получить обмены пользователя
  getUserExchanges: (walletAddress) => {
    return exchanges.filter(exchange => exchange.walletAddress === walletAddress);
  },
  
  // Обновить статус обмена
  updateExchangeStatus: (id, status) => {
    const index = exchanges.findIndex(exchange => exchange.id === id);
    if (index !== -1) {
      exchanges[index].status = status;
      exchanges[index].updatedAt = new Date().toISOString();
      return true;
    }
    return false;
  },
  
  // Получить адрес для депозита
  getDepositAddress: (currency) => {
    return depositAddresses[currency] || '';
  }
};