const express = require('express');
const sql = require('mysql');
const debug = require('debug')('app');

const carRouter = express.Router();

const config = {

  user: 'root',
  password: 'password123',
  host: 'localhost',
  port: '3306',
  database: 'bigdata'
};


function router(nav) {
  const cars = [{
    make: 'Honda', model: 'Brio', year: '2012', drive: '2wd', image: 'http://www.yim778.com/data/out/282/1519835.png'
  }];

  carRouter.route('/')
    .get((_req, res) => {
      const con = sql.createConnection(config);
      con.connect((err) => {
        if (err) {
          throw err;
        }
        con.query('select make,model,year,drive from bigdata.vehicleinfo', (err, results) => {
          if (err) throw err;
          console.log(' This is executed in the query ');
          results.forEach((result) => {
            if (typeof result.image === 'undefined') {
              const car = {
                make: result.make, model: result.model, year: result.year, drive: result.drive, image: 'http://www.yim778.com/data/out/282/1519835.png'
              };
              cars.push(car);
            } else {
              const car = {
                make: result.make, model: result.model, year: result.year, drive: result.drive, image: result.image
              };
              cars.push(car);
            }
          });
        });
        console.log(' This is executed before the query ');
      });
      res.render('carListView', {
        nav,
        title: 'Cars List View',
        cars
      });
    });

  carRouter.route('/:id')
    .get((req, res) => {
      const id = req.params.id;
      res.render('bookView',
        {
          nav,
          title: 'Library',
          car: cars[id]
        });
    });

  return carRouter;
}

module.exports = router;
