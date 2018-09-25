const express = require('express');
// used for coloring the log
const chalk = require('chalk');
// used for debugging and profiling
const debug = require('debug')('app');
// used for logging request details
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.port || 3000;


app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './views/');
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');

const nav = [
  { link: '/cars', title: 'Cars' },
  { link: '/authors', title: 'Author' }
];
const carRouter = require('./routes/carRoutes')(nav);
const authorRouter = require('./routes/authorRoutes')(nav);

app.use('/cars', carRouter);
app.use('/authors', authorRouter);
// Render the Home Page 'index.ejs'
app.get('/', (_req, res) => {
  //  res.send('hello form my lib');
  // res.sendFile(path.join(__dirname, 'views', 'index.html'));

  res.render('index', {
    nav: [{ link: '/cars', title: 'Cars' },
      { link: '/authors', title: 'Authors' }],
    title: 'Home Page'
  });
});

app.listen(3000, () => {
  debug(`listening on port ${chalk.default.green(port)}`);
});
