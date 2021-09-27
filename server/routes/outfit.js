const router = require('express').Router();

let outfit = [];

router.route('/')
  .get((req, res) => {
    res.status(200).send(JSON.stringify(outfit));
  })

  .post((req, res) => {
    console.log('outfit post body: ', req.body);
    if (!outfit.includes(JSON.parse(req.body[req.body.length - 1]))) {
      outfit = outfit.concat(JSON.parse(req.body[req.body.length - 1]));
    }
    console.log('new outfit is: ', outfit);
    res.status(200).end();
  });

module.exports = router;