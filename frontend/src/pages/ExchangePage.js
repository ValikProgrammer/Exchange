import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import ExchangeForm from '../components/ExchangeForm';

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

const ExchangePage = () => {
  return (
    <Container>
      <PageHeader>
        <PageTitle>Обмен криптовалют</PageTitle>
        <PageDescription>
          Обменивайте USDT на популярные криптовалюты с лучшими курсами и мгновенными транзакциями
        </PageDescription>
      </PageHeader>
      
      <Row className="justify-content-center">
        <Col lg={8} xl={7}>
          <ExchangeForm />
        </Col>
      </Row>
    </Container>
  );
};

export default ExchangePage;