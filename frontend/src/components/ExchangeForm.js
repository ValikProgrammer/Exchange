import React, { useState, useEffect } from 'react';
import { Card, Form, Button, InputGroup, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faWallet, faCopy, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { rateService } from '../services/rateService';
import { exchangeService } from '../services/exchangeService';

const StyledCard = styled(Card)`
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: none;
`;

const CardHeader = styled(Card.Header)`
  background-color: #1a2c38;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const CardTitle = styled.h3`
  color: white;
  font-weight: 600;
  margin: 0;
`;

const CardBody = styled(Card.Body)`
  padding: 30px;
`;

const CurrencySelect = styled(Form.Select)`
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 15px;
  height: auto;
  
  &:focus {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const CurrencyInput = styled(Form.Control)`
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 15px;
  height: auto;
  
  &:focus {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const ExchangeButton = styled(Button)`
  padding: 12px 20px;
  font-weight: 600;
  width: 100%;
  margin-top: 20px;
`;

const RateInfo = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 15px;
  margin: 20px 0;
  font-size: 14px;
`;

const WalletAddressCard = styled(Card)`
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-top: 20px;
`;

const WalletAddressHeader = styled(Card.Header)`
  background-color: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px;
  font-weight: 600;
`;

const WalletAddressBody = styled(Card.Body)`
  padding: 15px;
`;

const WalletAddress = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 15px;
  font-family: monospace;
  word-break: break-all;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CopyButton = styled(Button)`
  background-color: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  padding: 5px;
  
  &:hover {
    background-color: transparent;
    color: white;
  }
  
  &:focus {
    box-shadow: none;
    background-color: transparent;
  }
`;

const ExchangeForm = () => {
  const [fromCurrency] = useState('USDT');
  const [toCurrency, setToCurrency] = useState('BTC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [step, setStep] = useState(1);
  const [walletAddress, setWalletAddress] = useState('');
  const [depositAddress, setDepositAddress] = useState('');
  const [exchangeId, setExchangeId] = useState('');
  const navigate = useNavigate();
  
  const supportedCurrencies = [
    { value: 'BTC', label: 'Bitcoin (BTC)' },
    { value: 'ETH', label: 'Ethereum (ETH)' },
    { value: 'BNB', label: 'Binance Coin (BNB)' },
    { value: 'SOL', label: 'Solana (SOL)' },
    { value: 'ADA', label: 'Cardano (ADA)' },
    { value: 'XRP', label: 'Ripple (XRP)' },
    { value: 'DOGE', label: 'Dogecoin (DOGE)' }
  ];
  
  useEffect(() => {
    // Получаем курс обмена при изменении валют
    if (toCurrency) {
      const rate = rateService.getExchangeRate(fromCurrency, toCurrency);
      setExchangeRate(rate);
      
      // Пересчитываем сумму получения при изменении курса
      if (fromAmount) {
        const calculatedAmount = (parseFloat(fromAmount) * rate).toFixed(8);
        setToAmount(calculatedAmount);
      }
    }
  }, [fromCurrency, toCurrency, fromAmount]);
  
  const handleFromAmountChange = (e) => {
    const value = e.target.value;
    setFromAmount(value);
    
    if (value && !isNaN(value) && exchangeRate) {
      const calculatedAmount = (parseFloat(value) * exchangeRate).toFixed(8);
      setToAmount(calculatedAmount);
    } else {
      setToAmount('');
    }
  };
  
  const handleToAmountChange = (e) => {
    const value = e.target.value;
    setToAmount(value);
    
    if (value && !isNaN(value) && exchangeRate) {
      const calculatedAmount = (parseFloat(value) / exchangeRate).toFixed(8);
      setFromAmount(calculatedAmount);
    } else {
      setFromAmount('');
    }
  };
  
  const handleCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };
  
  const handleWalletAddressChange = (e) => {
    setWalletAddress(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step === 1) {
      // Валидация формы
      if (!fromAmount || isNaN(fromAmount) || parseFloat(fromAmount) <= 0) {
        toast.error('Пожалуйста, введите корректную сумму для обмена');
        return;
      }
      
      if (!toCurrency) {
        toast.error('Пожалуйста, выберите валюту для получения');
        return;
      }
      
      // Переходим к шагу 2
      setStep(2);
    } else if (step === 2) {
      // Валидация адреса кошелька
      if (!walletAddress || walletAddress.trim() === '') {
        toast.error('Пожалуйста, введите адрес вашего кошелька');
        return;
      }
      
      // Создаем обмен
      const exchange = exchangeService.createExchange({
        fromCurrency,
        toCurrency,
        fromAmount: parseFloat(fromAmount),
        toAmount: parseFloat(toAmount),
        walletAddress,
        status: 'pending'
      });
      
      setExchangeId(exchange.id);
      setDepositAddress(exchangeService.getDepositAddress(fromCurrency));
      
      // Переходим к шагу 3
      setStep(3);
    } else if (step === 3) {
      // Переходим на страницу статуса обмена
      navigate(`/status/${exchangeId}`);
    }
  };
  
  const renderStepOne = () => (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-4">
            <Form.Label>Вы отправляете</Form.Label>
            <InputGroup>
              <CurrencyInput
                type="number"
                placeholder="Сумма"
                value={fromAmount}
                onChange={handleFromAmountChange}
                required
              />
              <InputGroup.Text className="bg-dark text-light border-secondary">
                USDT
              </InputGroup.Text>
            </InputGroup>
            <Form.Text className="text-muted">
              Минимальная сумма: 10 USDT
            </Form.Text>
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-4">
            <Form.Label>Вы получаете</Form.Label>
            <InputGroup>
              <CurrencyInput
                type="number"
                placeholder="Сумма"
                value={toAmount}
                onChange={handleToAmountChange}
                required
              />
              <CurrencySelect 
                value={toCurrency} 
                onChange={handleCurrencyChange}
              >
                {supportedCurrencies.map(currency => (
                  <option key={currency.value} value={currency.value}>
                    {currency.value}
                  </option>
                ))}
              </CurrencySelect>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      
      <RateInfo>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
            Курс обмена:
          </div>
          <div>
            <strong>1 {fromCurrency} = {exchangeRate.toFixed(8)} {toCurrency}</strong>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div>Комиссия:</div>
          <div>3%</div>
        </div>
      </RateInfo>
      
      <ExchangeButton type="submit" variant="primary">
        <FontAwesomeIcon icon={faExchangeAlt} className="me-2" />
        Продолжить обмен
      </ExchangeButton>
    </Form>
  );
  
  const renderStepTwo = () => (
    <Form onSubmit={handleSubmit}>
      <Alert variant="info" className="mb-4">
        <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
        Вы обмениваете <strong>{fromAmount} {fromCurrency}</strong> на <strong>{toAmount} {toCurrency}</strong>
      </Alert>
      
      <Form.Group className="mb-4">
        <Form.Label>
          <FontAwesomeIcon icon={faWallet} className="me-2" />
          Введите адрес вашего {toCurrency} кошелька
        </Form.Label>
        <CurrencyInput
          type="text"
          placeholder={`Адрес ${toCurrency} кошелька`}
          value={walletAddress}
          onChange={handleWalletAddressChange}
          required
        />
        <Form.Text className="text-muted">
          Убедитесь, что адрес введен правильно. Мы не несем ответственности за отправку средств на неверный адрес.
        </Form.Text>
      </Form.Group>
      
      <ExchangeButton type="submit" variant="primary">
        <FontAwesomeIcon icon={faExchangeAlt} className="me-2" />
        Создать обмен
      </ExchangeButton>
      
      <Button 
        variant="link" 
        className="mt-3 text-muted w-100"
        onClick={() => setStep(1)}
      >
        Вернуться назад
      </Button>
    </Form>
  );
  
  const renderStepThree = () => (
    <>
      <Alert variant="success" className="mb-4">
        <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
        Обмен создан! Отправьте <strong>{fromAmount} {fromCurrency}</strong> на указанный адрес
      </Alert>
      
      <WalletAddressCard>
        <WalletAddressHeader>
          <FontAwesomeIcon icon={faWallet} className="me-2" />
          Адрес для отправки {fromCurrency}
        </WalletAddressHeader>
        <WalletAddressBody>
          <WalletAddress>
            <span>{depositAddress}</span>
            <CopyToClipboard 
              text={depositAddress}
              onCopy={() => toast.success('Адрес скопирован!')}
            >
              <CopyButton variant="link">
                <FontAwesomeIcon icon={faCopy} />
              </CopyButton>
            </CopyToClipboard>
          </WalletAddress>
          <Alert variant="warning">
            <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
            Отправляйте только {fromCurrency} на этот адрес. Отправка других токенов может привести к потере средств.
          </Alert>
        </WalletAddressBody>
      </WalletAddressCard>
      
      <div className="text-center mt-4">
        <p>После отправки средств, мы автоматически отправим {toAmount} {toCurrency} на ваш кошелек.</p>
        <p>Вы можете отслеживать статус вашего обмена на странице статуса.</p>
      </div>
      
      <ExchangeButton 
        variant="primary" 
        onClick={() => navigate(`/status/${exchangeId}`)}
      >
        Перейти к статусу обмена
      </ExchangeButton>
    </>
  );
  
  return (
    <StyledCard>
      <CardHeader>
        <CardTitle>
          <FontAwesomeIcon icon={faExchangeAlt} className="me-2" />
          {step === 1 && 'Обмен криптовалюты'}
          {step === 2 && 'Укажите адрес кошелька'}
          {step === 3 && 'Отправьте средства'}
        </CardTitle>
      </CardHeader>
      <CardBody>
        {step === 1 && renderStepOne()}
        {step === 2 && renderStepTwo()}
        {step === 3 && renderStepThree()}
      </CardBody>
    </StyledCard>
  );
};

export default ExchangeForm;