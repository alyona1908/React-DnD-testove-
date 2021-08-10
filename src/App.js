import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreateTable from './components/table/table';
import ModalWind from './components/modal/modal'


import './App.css';

function App () {
  return (
  <Container>
    <Row>
      <Col>
        <CreateTable className='table'/>
      </Col>
    </Row>
    <ModalWind />
  </Container>
  )
}

export default App; 