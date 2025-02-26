// frontend/src/services/settingsService.js
import { rateService } from './rateService';

// Настройки по умолчанию
const defaultSettings = {
  discountPercentage: 3,
  discountCoin: 'TRX'
};

// Текущие настройки
let currentSettings = { ...defaultSettings };

// Функция для получения настроек
const getSettings = () => {
  return { ...currentSettings };
};

// Функция для обновления настроек
const updateSettings = (newSettings) => {
  currentSettings = {
    ...currentSettings,
    ...newSettings
  };
  
  // Обновляем настройки скидки в сервисе курсов
  rateService.updateDiscountSettings(currentSettings);
  
  console.log('Настройки обновлены:', currentSettings);
  
  return currentSettings;
};

export const settingsService = {
  getSettings,
  updateSettings
};