import React, {useState, useEffect, useContext } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import {ProductContext} from '../productContext.jsx';
import axios from 'axios';

const RelatedModal = ({comparison, show, setShow}) => {
  const [MainProduct, setMainProduct] = useState({});
  const { prodInfo } = useContext(ProductContext);

  const handleClose = (e) => {
    setShow(false);
  };
  // const handleShow = (e) => {
  //   console.log('in handleshow');
  //   setShow(true);
  //   e.stopPropagation();
  // };
  const checkForFeature = (feature, product) => {
    if(product.includes(feature)) {
      return (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
        </svg>);
    }
  }

  let mainFeaturesString = JSON.stringify(prodInfo.features);
  let comparisonFeaturesString = JSON.stringify(comparison.features);

  return (
    <div>
      <Modal show={show} onHide={(e) => handleClose(e)}>
        <Modal.Header closeButton>
          <Modal.Title>Comparing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col className="mx-auto">{prodInfo.name}</Col>
              <Col className="mx-auto">Features</Col>
              <Col className="mx-auto">{comparison.name}</Col>
            </Row>
              {prodInfo.features.map((feature, index) => {
                return (
                  <Row>
                    <Col className="mx-auto">{checkForFeature(feature.feature, mainFeaturesString)}</Col>
                    <Col className="mx-auto">{feature.feature}</Col>
                    <Col className="mx-auto">{checkForFeature(feature.feature, comparisonFeaturesString)}</Col>
                  </Row>
                )
              })}
              {comparison.features.map((compFeature, index) => {
                return (
                  <Row>
                    <Col className="mx-auto">{checkForFeature(compFeature.feature, mainFeaturesString)}</Col>
                    <Col className="mx-auto">{compFeature.feature}</Col>
                    <Col className="mx-auto">{checkForFeature(compFeature.feature, comparisonFeaturesString)}</Col>
                  </Row>
                )
              })}
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RelatedModal;