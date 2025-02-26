// frontend/src/services/exchangeService.js
import { v4 as uuidv4 } from 'uuid';
import { rateService } from './rateService';

// Хранилище для обменов
const exchanges = [];

// Функция для создания нового обмена
const createExchange = (fromCurrency, toCurrency, fromAmount, toAddress) => {
  const exchange = rateService.createExchange(fromCurrency, toCurrency, fromAmount, toAddress);
  
  // Добавляем обмен в хранилище
  exchanges.push(exchange);
  
  console.log('Обмен добавлен в хранилище:', exchange);
  
  return exchange;
};

// Функция для получения всех обменов
const getAllExchanges = () => {
  return [...exchanges];
};

// Функция для получения обмена по ID
const getExchangeById = (id) => {
  return exchanges.find(exchange => exchange.id === id);
};

// Функция для обновления статуса обмена
const updateExchangeStatus = (id, status) => {
  const exchange = exchanges.find(exchange => exchange.id === id);
  
  if (exchange) {
    exchange.status = status;
    exchange.updatedAt = new Date().toISOString();
    
    console.log(`Статус обмена ${id} обновлен на ${status}`);
    
    return exchange;
  }
  
  return null;
};

export const exchangeService = {
  createExchange,
  getAllExchanges,
  getExchangeById,
  updateExchangeStatus
};