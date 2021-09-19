import React from 'react';
import {Col, Container, Row, Spinner} from 'react-bootstrap';

const Loader = () => {
  return (
    <Container>
      <Row className="vh-100 justify-content-center align-items-center">
        <Col className="text-center">
          <Spinner animation="grow" variant="dark" />
        </Col>
      </Row>
    </Container>
  );
};

export default Loader;
