/* eslint-disable no-console */
const router = require('express').Router();
const axios = require('axios');
const { TOKEN } = require('../../config');

router.route('/')
  .get((req, res) => {
    const data = '';

    const config = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products',
      headers: {
        Authorization: TOKEN,
      },
      data,
    };

    axios(config)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((error) => {
        res.status(400).send();
        console.log(error);
      });
  });

router.route('/:product_id')
  .get((req, res) => {
    const data = '';

    const config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${req.params.product_id}`,
      headers: {
        Authorization: TOKEN,
      },
      data,
    };

    axios(config)
      .then((response) => {
        res.status(200).send(response.data);
        res.end();
      })
      .catch((error) => {
        res.status(400).send();
        console.log(error);
      });
  });

router.route('/:product_id/styles')
  .get((req, res) => {
    const data = '';

    const config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${req.params.product_id}/styles`,
      headers: {
        Authorization: TOKEN,
      },
      data,
    };

    axios(config)
      .then((response) => {
        res.status(200).send(response.data);
        res.end();
      })
      .catch((error) => {
        res.status(400).send();
        console.log(error);
      });
  });

router.route('/:product_id/related')
  .get((req, res) => {
    const data = '';

    const config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${req.params.product_id}/related`,
      headers: {
        Authorization: TOKEN,
      },
      data,
    };

    axios(config)
      .then((response) => {
        res.status(200).send(response.data);
        res.end();
      })
      .catch((error) => {
        res.status(400).send();
        console.log(error);
      });
  });

router.route('/:product_id/related')
  .get((req, res) => {
    const data = '';

    const config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products?product_id=${req.params.product_id}/related`,
      headers: {
        Authorization: TOKEN,
      },
      data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        res.status(200).send((response.data));
        res.end();
      })
      .catch((error) => {
        res.status(400).send();
        console.log(error);
      });
  });
module.exports = router;
