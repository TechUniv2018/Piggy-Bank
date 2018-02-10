// const Server = require('../../server');
//
// describe('Testing the hapi server for POST request', () => {
//   test('Should return 201 status code for sucessful POST request', (done) => {
//     const options = {
//       method: 'POST',
//       url: '/users/new',
//       payload: { userId: 'akanksha', password: 'codechef' },
//     };
//     Server.inject(options, (response) => {
//       expect(response.result.statusCode).toBe(201);
//       done();
//     });
//   });
//   test('Should return correct response for successful POST request', (done) => {
//     const options = {
//       method: 'POST',
//       url: '/users/new',
//       payload: { userId: 'akanksha', password: 'codechef' },
//     };
//     Server.inject(options, (response) => {
//       expect(JSON.parse(response.payload).message).toMatch('User created');
//       done();
//     });
//   });
// });
