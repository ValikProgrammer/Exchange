// frontend/src/components/ExchangeForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { rateService } from '../services/rateService';
import { exchangeService } from '../services/exchangeService';

const StyledForm = styled(Form)`
  padding: 20px 0;
`;

const CurrencyCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const CurrencyLabel = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
`;

const CurrencyInput = styled(Form.Control)`
  font-size: 1.5rem;
  font-weight: 600;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  
  &:focus {
    border-color: #4169e1;
    box-shadow: 0 0 0 0.2rem rgba(65, 105, 225, 0.25);
  }
`;

const CurrencySelect = styled(Form.Select)`
  font-weight: 600;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #f8f9fa;
  
  &:focus {
    border-color: #4169e1;
    box-shadow: 0 0 0 0.2rem rgba(65, 105, 225, 0.25);
  }
`;

const ExchangeButton = styled(Button)`
  background: linear-gradient(90deg, #4169e1 0%, #3a7bd5 100%);
  border: none;
  padding: 15px 30px;
  font-weight: 600;
  font-size: 1.1rem;
  width: 100%;
  margin-top: 20px;
  
  &:hover {
    background: linear-gradient(90deg, #3a7bd5 0%, #4169e1 100%);
  }
`;

const ExchangeIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #4169e1;
  margin: 20px 0;
`;

const RateInfo = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
`;

const FeeInfo = styled.div`
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
  font-size: 0.9rem;
  color: #666;
`;

const FeeRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const CurrencyFlag = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  border-radius: 50%;
`;

const CurrencyOption = styled.div`
  display: flex;
  align-items: center;
`;

const ExchangeForm = () => {
  // Состояния для формы
  const [fromCurrency, setFromCurrency] = useState('USDT');
  const [toCurrency, setToCurrency] = useState('TRX');
  const [fromAmount, setFromAmount] = useState(1000);
  const [toAmount, setToAmount] = useState(0);
  const [toAddress, setToAddress] = useState('');
  const [rates, setRates] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [discountSettings, setDiscountSettings] = useState({});
  
  // Список доступных валют
  const currencies = [
    { code: 'USDT', name: 'Tether', flag: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=025' },
    { code: 'BTC', name: 'Bitcoin', flag: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025' },
    { code: 'ETH', name: 'Ethereum', flag: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025' },
    { code: 'BNB', name: 'Binance Coin', flag: 'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=025' },
    { code: 'SOL', name: 'Solana', flag: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=025' },
    { code: 'ADA', name: 'Cardano', flag: 'https://cryptologos.cc/logos/cardano-ada-logo.png?v=025' },
    { code: 'XRP', name: 'Ripple', flag: 'https://cryptologos.cc/logos/xrp-xrp-logo.png?v=025' },
    { code: 'DOGE', name: 'Dogecoin', flag: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=025' },
    { code: 'TRX', name: 'TRON', flag: 'https://cryptologos.cc/logos/tron-trx-logo.png?v=025' }
  ];
  
  // Подписываемся на обновления курсов
  useEffect(() => {
    const unsubscribe = rateService.subscribeToRates((updatedRates) => {
      setRates(updatedRates);
      
      // Обновляем сумму к получению при изменении курсов
      if (fromCurrency === 'USDT' && toCurrency !== 'USDT') {
        setToAmount(fromAmount * updatedRates[toCurrency]);
      } else if (toCurrency === 'USDT' && fromCurrency !== 'USDT') {
        setToAmount(fromAmount / updatedRates[fromCurrency]);
      }
    });
    
    // Получаем настройки скидки
    setDiscountSettings(rateService.getDiscountSettings());
    
    return () => {
      unsubscribe();
    };
  }, [fromCurrency, toCurrency, fromAmount]);
  
  // Обработчик изменения суммы отправления
  const handleFromAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setFromAmount(value);
    
    // Обновляем сумму к получению
    if (fromCurrency === 'USDT' && toCurrency !== 'USDT') {
      setToAmount(value * rates[toCurrency]);
    } else if (toCurrency === 'USDT' && fromCurrency !== 'USDT') {
      setToAmount(value / rates[fromCurrency]);
    }
  };
  
  // Обработчик изменения валюты отправления
  const handleFromCurrencyChange = (e) => {
    const newFromCurrency = e.target.value;
    setFromCurrency(newFromCurrency);
    
    // Обновляем сумму к получению
    if (newFromCurrency === 'USDT' && toCurrency !== 'USDT') {
      setToAmount(fromAmount * rates[toCurrency]);
    } else if (toCurrency === 'USDT' && newFromCurrency !== 'USDT') {
      setToAmount(fromAmount / rates[newFromCurrency]);
    }
  };
  
  // Обработчик изменения валюты получения
  const handleToCurrencyChange = (e) => {
    const newToCurrency = e.target.value;
    setToCurrency(newToCurrency);
    
    // Обновляем сумму к получению
    if (fromCurrency === 'USDT' && newToCurrency !== 'USDT') {
      setToAmount(fromAmount * rates[newToCurrency]);
    } else if (newToCurrency === 'USDT' && fromCurrency !== 'USDT') {
      setToAmount(fromAmount / rates[fromCurrency]);
    }
  };
  
  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!toAddress) {
      alert('Пожалуйста, укажите адрес кошелька для получения');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Создаем новый обмен
      const exchange = exchangeService.createExchange(
        fromCurrency,
        toCurrency,
        fromAmount,
        toAddress
      );
      
      console.log('Обмен создан:', exchange);
      
      // Перенаправляем на страницу статуса
      window.location.href = `/status?id=${exchange.id}`;
    } catch (error) {
      console.error('Ошибка при создании обмена:', error);
      alert('Произошла ошибка при создании обмена. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Рассчитываем комиссию сервиса (2.5%)
  const serviceFee = fromAmount * 0.025;
  
  // Рассчитываем комиссию сети (фиксированная)
  const networkFee = 0.06;
  
  // Получаем текущий курс
  const currentRate = fromCurrency === 'USDT' && toCurrency !== 'USDT'
    ? rates[toCurrency]
    : toCurrency === 'USDT' && fromCurrency !== 'USDT'
      ? 1 / rates[fromCurrency]
      : 0;
  
  return (
    <StyledForm onSubmit={handleSubmit}>
      <Row>
        <Col md={5}>
          <CurrencyCard>
            <CurrencyLabel>Продаю</CurrencyLabel>
            <InputGroup className="mb-3">
              <CurrencyInput
                type="number"
                value={fromAmount}
                onChange={handleFromAmountChange}
                min="10"
                step="1"
                required
              />
              <CurrencySelect
                value={fromCurrency}
                onChange={handleFromCurrencyChange}
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code}
                  </option>
                ))}
              </CurrencySelect>
            </InputGroup>
          </CurrencyCard>
        </Col>
        
        <Col md={2}>
          <ExchangeIcon>
            <FontAwesomeIcon icon={faExchangeAlt} />
          </ExchangeIcon>
        </Col>
        
        <Col md={5}>
          <CurrencyCard>
            <CurrencyLabel>Получаю</CurrencyLabel>
            <InputGroup className="mb-3">
              <CurrencyInput
                type="number"
                value={toAmount.toFixed(8)}
                readOnly
              />
              <CurrencySelect
                value={toCurrency}
                onChange={handleToCurrencyChange}
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code}
                  </option>
                ))}
              </CurrencySelect>
            </InputGroup>
          </CurrencyCard>
        </Col>
      </Row>
      
      <RateInfo>
        1 {toCurrency} ≈ {(1 / currentRate).toFixed(4)} {fromCurrency}
        {toCurrency === discountSettings.discountCoin && (
          <span className="text-success ms-2">
            (включая скидку {discountSettings.discountPercentage}%)
          </span>
        )}
      </RateInfo>
      
      <Form.Group className="mb-3">
        <Form.Label>Адрес кошелька для получения {toCurrency}</Form.Label>
        <Form.Control
          type="text"
          placeholder={`Введите адрес ${toCurrency} кошелька`}
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          required
        />
      </Form.Group>
      
      <FeeInfo>
        <FeeRow>
          <span>Включены:</span>
        </FeeRow>
        <FeeRow>
          <span>Комиссия сервиса</span>
          <span>{serviceFee.toFixed(2)} {fromCurrency}</span>
        </FeeRow>
        <FeeRow>
          <span>Комиссия сети блокчейн</span>
          <span>{networkFee.toFixed(2)} {fromCurrency}</span>
        </FeeRow>
      </FeeInfo>
      
      <ExchangeButton type="submit" disabled={isSubmitting}>
        Обменять
      </ExchangeButton>
    </StyledForm>
  );
};

export default ExchangeForm;