module.exports = [
  {
    method: 'GET',
    path: '/dashboard',
    handler: (request, response) => {
      response.view('dashboard', {
        firstName: 'Anmol',
        lastName: 'Varma',
        address: 'McKiasdadassd',
        phone: '100',
        email: 'anmol5varma@gmail.com',
        dob: '26/10/1996',
        gender: 'Male',
        img_src: '-42c3-a3a0-4886a49bd012/original/2195219-1449924847806-image-2.jpg',
      });
    },
  }];
