const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   if(req.url === '/maintainance') {
//     res.render('maintainance.hbs');
//   } else {
//     next();
//   }
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Rabi',
  //   likes: [
  //     'Biking',
  //     'Cities'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to new tutorial.'
  });
});

app.get('/about', (req, res) => {
  // res.send(':smile_cat:');
  res.render('about.hbs', {
    pageTitle: 'About',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    status: 500,
    errorMessage: 'Unable to handle the request.'
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
