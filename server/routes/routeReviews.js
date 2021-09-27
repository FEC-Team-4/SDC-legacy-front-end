/* eslint-disable camelcase */
const router = require('express').Router();
const axios = require('axios');
const { TOKEN } = require('../../config');

router.route('/:product_id')
  .get((req, res) => {
    const { sortBy } = req.query;
    const config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews`,
      headers: {
        Authorization: TOKEN,
      },
      params: {
        product_id: req.params.product_id,
        count: 50,
        sort: sortBy
      }
    };

    axios(config)
      .then(results => res.status(200).send(results.data))
      .catch(err => res.status(400).send(`Couldn't get any reviews`, err));
  })
  .post((req, res) => {
    const { product_id } = req.params;

    const config = {
      method: 'post',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews`,
      headers: {
        Authorization: TOKEN,
      },
      data: { product_id: Number(product_id), ...req.body },
    };

    axios(config)
      .then(() => res.status(201).send('CREATED'))
      .catch((err) => res.status(400).send(`Couldn't post review`, err));
  });

router.route('/meta/:product_id')
  .get((req, res) => {
    const config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/meta?product_id=${req.params.product_id}`,
      headers: {
        Authorization: TOKEN,
      }
    };

    axios(config)
      .then((results) => res.status(200).send(results.data))
      .catch((err) => res.status(400).send(`Couldn't get review metadata`, err));
  });

router.route('/:review_id/helpful')
  .put((req, res) => {
    const config = {
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/${req.params.review_id}/helpful`,
      headers: {
        Authorization: TOKEN,
      }
    };

    axios(config)
      .then((results) => res.status(200).send('Updated review as helpful!'))
      .catch((err) => res.status(400).send(`Couldn't update review as helpful`, err));
  });

router.route('/:review_id/report')
  .put((req, res) => {
    const config = {
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/${req.params.review_id}/report`,
      headers: {
        Authorization: TOKEN,
      }
    };

    axios(config)
      .then((results) => res.status(200).send('Review has been reported'))
      .catch((err) => res.status(400).send(`Couldn't report review`, err));
  });

module.exports = router;
