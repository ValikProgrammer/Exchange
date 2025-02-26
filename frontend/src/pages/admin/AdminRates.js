// frontend/src/pages/admin/AdminRates.js
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faSync, faCoins } from '@fortawesome/free-solid-svg-icons';
import { settingsService } from '../../services/settingsService';

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 30px;
`;

const StyledTable = styled(Table)`
  background-color: #1a2c38;
  color: white;
  
  th {
    background-color: #0f1923;
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  td {
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const RateInput = styled(Form.Control)`
  background-color: #0f1923;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  
  &:focus {
    background-color: #0f1923;
    color: white;
  }
`;

const InfoCard = styled.div`
  background-color: #1a2c38;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
`;

const AdminRates = () => {
  // Список доступных криптовалют
  const currencies = [
    { code: 'BTC', name: 'Bitcoin' },
    { code: 'ETH', name: 'Ethereum' },
    { code: 'BNB', name: 'Binance Coin' },
    { code: 'SOL', name: 'Solana' },
    { code: 'ADA', name: 'Cardano' },
    { code: 'XRP', name: 'Ripple' },
    { code: 'DOGE', name: 'Dogecoin' }
  ];
  
  // Состояние для хранения курсов валют
  const [rates, setRates] = useState({
    'USDT_BTC': 0.000038,
    'USDT_ETH': 0.00052,
    'USDT_BNB': 0.0038,
    'USDT_SOL': 0.016,
    'USDT_ADA': 0.5,
    'USDT_XRP': 0.6,
    'USDT_DOGE': 15
  });
  
  // Состояние для хранения новых значений курсов
  const [newRates, setNewRates] = useState({...rates});
  
  // Состояние для уведомлений
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
  
  // Состояние для настроек скидки
  const [discountSettings, setDiscountSettings] = useState({
    discountPercentage: 3,
    discountCoin: 'BTC'
  });
  
  // Загрузка настроек при монтировании компонента
  useEffect(() => {
    const settings = settingsService.getSettings();
    if (settings) {
      setDiscountSettings({
        discountPercentage: settings.discountPercentage,
        discountCoin: settings.discountCoin
      });
    }
    
    // В реальном проекте здесь должна быть загрузка курсов с сервера
    console.log('Загрузка курсов валют');
  }, []);
  
  // Обработчик изменения значения курса
  const handleRateChange = (currencyCode, value) => {
    const rateKey = `USDT_${currencyCode}`;
    setNewRates(prev => ({
      ...prev,
      [rateKey]: parseFloat(value) || 0
    }));
  };
  
  // Сохранение курсов валют
  const handleSaveRates = () => {
    // В реальном проекте здесь должна быть отправка данных на сервер
    setRates({...newRates});
    
    // Вывод в консоль для отладки
    console.log('Курсы валют сохранены:', newRates);
    
    // Показать уведомление
    setAlert({
      show: true,
      variant: 'success',
      message: 'Курсы валют успешно обновлены!'
    });
    
    // Скрыть уведомление через 3 секунды
    setTimeout(() => {
      setAlert({ show: false, variant: '', message: '' });
    }, 3000);
  };
  
  // Обновление курсов валют (имитация получения актуальных данных)
  const handleRefreshRates = () => {
    // В реальном проекте здесь должен быть запрос к API для получения актуальных курсов
    console.log('Запрос актуальных курсов валют');
    
    // Имитация обновления курсов (случайные изменения в пределах ±5%)
    const updatedRates = {};
    Object.keys(rates).forEach(key => {
      const currentRate = rates[key];
      const changePercent = (Math.random() * 10 - 5) / 100; // от -5% до +5%
      updatedRates[key] = currentRate * (1 + changePercent);
    });
    
    setRates(updatedRates);
    setNewRates(updatedRates);
    
    // Показать уведомление
    setAlert({
      show: true,
      variant: 'info',
      message: 'Курсы валют обновлены с биржи!'
    });
    
    // Скрыть уведомление через 3 секунды
    setTimeout(() => {
      setAlert({ show: false, variant: '', message: '' });
    }, 3000);
  };
  
  // Расчет курса с учетом скидки
  const calculateDiscountedRate = (currencyCode, rate) => {
    if (currencyCode === discountSettings.discountCoin) {
      // Расчет скидки: если XRP стоит 100$, то с 3% скидкой курс будет 97$
      // Это означает, что пользователь получит больше криптовалюты за те же деньги
      const discountFactor = 1 / (1 - discountSettings.discountPercentage / 100);
      return rate * discountFactor;
    }
    return rate;
  };
  
  return (
    <Container>
      <PageTitle>Управление курсами валют</PageTitle>
      
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
          {alert.message}
        </Alert>
      )}
      
      <InfoCard>
        <Row>
          <Col md={6}>
            <h5>
              <FontAwesomeIcon icon={faCoins} className="me-2" />
              Текущая скидка
            </h5>
            <p>
              Скидка {discountSettings.discountPercentage}% применяется к валюте: {discountSettings.discountCoin}
            </p>
            <p className="text-muted">
              Скидка означает, что пользователь получит больше криптовалюты за те же деньги.
              Например, если XRP стоит 100$, то с 3% скидкой курс будет 97$.
            </p>
          </Col>
          <Col md={6} className="d-flex align-items-center justify-content-end">
            <Button variant="outline-primary" onClick={handleRefreshRates}>
              <FontAwesomeIcon icon={faSync} className="me-2" />
              Обновить курсы с биржи
            </Button>
          </Col>
        </Row>
      </InfoCard>
      
      <StyledTable responsive>
        <thead>
          <tr>
            <th>Валюта</th>
            <th>Текущий курс (USDT)</th>
            <th>Новый курс (USDT)</th>
            <th>Курс со скидкой</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map(currency => {
            const rateKey = `USDT_${currency.code}`;
            const currentRate = rates[rateKey] || 0;
            const newRate = newRates[rateKey] || 0;
            const discountedRate = calculateDiscountedRate(currency.code, newRate);
            
            return (
              <tr key={currency.code}>
                <td>
                  <strong>{currency.name}</strong> ({currency.code})
                </td>
                <td>{currentRate.toFixed(8)}</td>
                <td>
                  <RateInput
                    type="number"
                    step="0.00000001"
                    min="0"
                    value={newRate}
                    onChange={(e) => handleRateChange(currency.code, e.target.value)}
                  />
                </td>
                <td>
                  {currency.code === discountSettings.discountCoin ? (
                    <span className="text-success">{discountedRate.toFixed(8)}</span>
                  ) : (
                    newRate.toFixed(8)
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      
      <div className="d-flex justify-content-end mt-4">
        <Button variant="primary" onClick={handleSaveRates}>
          <FontAwesomeIcon icon={faSave} className="me-2" />
          Сохранить курсы
        </Button>
      </div>
    </Container>
  );
};

export default AdminRates;