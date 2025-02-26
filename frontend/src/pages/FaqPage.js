import React, { useState } from 'react';
import { Container, Accordion, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PageHeader = styled.div`
  padding: 60px 0 40px;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 700px;
  margin: 0 auto;
`;

const StyledAccordion = styled(Accordion)`
  margin-bottom: 40px;
  
  .accordion-item {
    background-color: #1a2c38;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 10px;
  }
  
  .accordion-button {
    background-color: #1a2c38;
    color: white;
    font-weight: 500;
    padding: 20px;
    
    &:not(.collapsed) {
      background-color: #1a2c38;
      color: white;
      box-shadow: none;
    }
    
    &:focus {
      box-shadow: none;
      border-color: rgba(255, 255, 255, 0.1);
    }
    
    &::after {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    }
  }
  
  .accordion-body {
    background-color: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
    padding: 20px;
  }
`;

const ContactSection = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #1a2c38;
  border-radius: 10px;
  margin-top: 40px;
`;

const FaqPage = () => {
  const [activeKey, setActiveKey] = useState('0');
  
  const faqItems = [
    {
      question: 'Как работает обмен криптовалют на вашей платформе?',
      answer: 'Наша платформа позволяет обменивать USDT на различные криптовалюты. Процесс обмена прост: вы выбираете криптовалюту, которую хотите получить, указываете сумму USDT для обмена, предоставляете адрес вашего кошелька для получения выбранной криптовалюты, и отправляете USDT на указанный нами адрес. После подтверждения транзакции, мы автоматически отправляем выбранную криптовалюту на ваш кошелек.'
    },
    {
      question: 'Какие криптовалюты поддерживаются для обмена?',
      answer: 'В настоящее время мы поддерживаем обмен USDT на следующие криптовалюты: Bitcoin (BTC), Ethereum (ETH), Binance Coin (BNB), Solana (SOL), Cardano (ADA), Ripple (XRP) и Dogecoin (DOGE). Мы постоянно работаем над расширением списка поддерживаемых криптовалют.'
    },
    {
      question: 'Какая комиссия взимается за обмен?',
      answer: 'Мы взимаем комиссию в размере 3% от суммы обмена. Эта комиссия уже включена в курс обмена, который вы видите на нашей платформе. Мы стремимся предлагать конкурентные курсы обмена, несмотря на комиссию.'
    },
    {
      question: 'Сколько времени занимает обмен?',
      answer: 'Время обмена зависит от загруженности сети блокчейна. Обычно, после получения подтверждения вашей транзакции USDT, мы отправляем выбранную криптовалюту на ваш кошелек в течение нескольких минут. В редких случаях, при высокой загруженности сети, процесс может занять до 30-60 минут.'
    },
    {
      question: 'Безопасно ли использовать вашу платформу?',
      answer: 'Да, безопасность — наш главный приоритет. Мы используем передовые технологии шифрования для защиты ваших данных и транзакций. Мы не храним ваши приватные ключи или пароли. Все транзакции проводятся через защищенные каналы. Кроме того, мы регулярно проводим аудит безопасности нашей системы.'
    },
    {
      question: 'Что делать, если я отправил средства, но не получил обмен?',
      answer: 'Если вы отправили USDT, но не получили обмен в течение длительного времени (более 1 часа), пожалуйста, свяжитесь с нашей службой поддержки. Предоставьте ID вашего обмена и хеш транзакции, и мы оперативно разберемся в ситуации. В большинстве случаев задержки связаны с загруженностью сети блокчейна.'
    },
    {
      question: 'Есть ли минимальная или максимальная сумма для обмена?',
      answer: 'Да, минимальная сумма для обмена составляет 10 USDT. Максимальная сумма не ограничена, однако для крупных обменов (более 10,000 USDT) мы рекомендуем связаться с нашей службой поддержки заранее для обеспечения наилучших условий обмена.'
    },
    {
      question: 'Как я могу отследить статус моего обмена?',
      answer: 'После создания обмена вы получаете уникальный ID обмена. Вы можете использовать этот ID для отслеживания статуса вашего обмена на странице статуса. Там вы увидите текущий статус обмена, детали транзакции и ожидаемое время завершения.'
    }
  ];
  
  return (
    <Container>
      <PageHeader>
        <PageTitle>Часто задаваемые вопросы</PageTitle>
        <PageDescription>
          Ответы на самые распространенные вопросы о нашем сервисе обмена криптовалют
        </PageDescription>
      </PageHeader>
      
      <StyledAccordion defaultActiveKey={activeKey}>
        {faqItems.map((item, index) => (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header>
              <FontAwesomeIcon icon={faQuestionCircle} className="me-3 text-primary" />
              {item.question}
            </Accordion.Header>
            <Accordion.Body>
              {item.answer}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </StyledAccordion>
      
      <ContactSection>
        <h3 className="mb-4">Не нашли ответ на свой вопрос?</h3>
        <p className="mb-4">
          Свяжитесь с нашей службой поддержки, и мы с радостью поможем вам решить любые вопросы.
        </p>
        <Button as={Link} to="/contact" variant="primary" size="lg">
          <FontAwesomeIcon icon={faEnvelope} className="me-2" />
          Связаться с поддержкой
        </Button>
      </ContactSection>
    </Container>
  );
};

export default FaqPage;