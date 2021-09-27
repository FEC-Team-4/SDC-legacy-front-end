/* eslint-disable no-undef */

// const request = require('supertest');
// const app = require('./server/index');

// app.listen(5000, () => {
//   console.log('test server is listening on 5000')
// });

test('adds 1 + 2', () => {
  expect(1 + 2).toBe(3);
});


test('testing a valid product id GET request for qa/questions ', async () => {

  await request(app).get("/api/qa/questions/42366")
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body.results)).toBeTruthy();
      expect(response.body.product_id).toBe('42366');
    })
})

test('testing a valid question id GET request for qa/questions.../answers ', async () => {

  await request(app).get("/api/qa/questions/348449/answers")
    .expect(200)
    .then(response => {
      expect(Array.isArray(response.body.results)).toBeTruthy();
      expect(response.body.results[0].answer_id).toBe(3257729);
    })
})

test('test a POST request for qa/questions.../answers ', async () => {

  const payload = {
    body: 'test body',
    name: 'test name',
    email: 'test@email.com',
    photos: []
  };

  await request(app).post("/api/qa/questions/348449/answers")
    .send(payload)
    .expect(200)
    .then((res) => {
      expect(res.request._data).toHaveProperty('body', 'test body');
    })
})

test('test a POST request for qa/questions ', async () => {

  const payload = {
    body: 'this is a test body',
    name: 'this is a test name',
    email: 'test@email.com',
    product_id: 42366
  };

  await request(app).post("/api/qa/questions")
    .send(payload)
    .expect(200)
    .then((res) => {
      expect(res.request._data).toHaveProperty('body', 'this is a test body');
    })
})

test('test a PUT request for qa/questions... /helpful ', async () => {

  await request(app).put("/api/qa/questions/348449/helpful")
    .expect(204)
})

test('test a PUT request for qa/questions... /report ', async () => {

  await request(app).put("/api/qa/questions/348449/report")
    .expect(204)
})

test('test a PUT request for qa/answers... /report ', async () => {
  // CHANGE THIS
  await request(app).put("/api/qa/answers/3257729/report")
    .expect(204)
})
test('test a PUT request for qa/answers... /helpful ', async () => {

  await request(app).put("/api/qa/answers/3257729/report")
    .expect(204)
})




