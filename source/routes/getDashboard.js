module.exports = [
  {
    method: 'GET',
    path: '/dashboard',
    handler: (request, response) => {
      response.view('dashboard', {
        firstName: 'Anmol',
        lastName: 'Varma',
        address: 'McKinsey',
        phone: '100',
        email: 'anmol5varma@gmail.com',
        dob: '26/10/1996',
        gender: 'Male',
        img_src: 'Piggy-Bank-logo.jpg',
      });
    },
  }];
