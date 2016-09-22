// server.js

// BASIC SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to APP Workshop Week 2!' });   
});

// more routes for our API will happen here

// We will simulate a database output, for a real app you should use an ORM an create a data model to work through the different CRUD operations
var cars = [
            {
                id : 1,
                license : "abc123",
                make: "VW"
            },
            {
                id : 2,
                license : "abc124",
                make: "Toyota"
            },
            {
                id : 3,
                license : "abc125",
                make: "Honda"
            }
        ];
var driver = [
    {
        id : 1,
        car_id : 1,
        name : 'David',
        location: 'abc street'
    },
    {
        id : 2,
        car_id : 2,
        name : 'Danny',
        location: 'def street'
    },
    {
        id : 3,
        car_id: 3,
        name: 'Dora',
        location: 'ghi steet'
    }
]

var passenger = [
    {
        id: 1,
        name: 'Penny',
        location: '123 road'
    },
    {
        id : 2,
        name: 'Patty',
        location: '456 road' 
    },
    {
        id : 3,
        name: 'Potter',
        location: '789 road'
    }
]

/*
routes of driver
**/

router.route('/driver') //this route is generic, so it will be used for generic operations as list all or create
    .get(function(req, res){
        // Get ALL the drivers
        
        res.json(driver); //return a json object
    })
    .post(function(req, res){
        driver.push(req.body);
        res.json(driver[driver.length-1]);
        
        console.log(req.body.id_car);//How to read data that was sent it to your API
        console.log(req.body.name);
        console.log(req.body.location); 
        
        res.sendStatus(201); 
        res.end();//Example of how to send an specific status code by default always returns 200
    });

router.route('/driver/:id/') //route to work with specific driver using an ID (for this case POST doesn't make sense)
    .get(function(req, res){
        var id = req.params.id;  //Read the value of the param defined in the route :id      
        //add code that find the car with the corresponding id
        for (var i = driver.length - 1; i >= 0; i--) {
            if(driver[i].id == id) {
                res.json(driver[i]);
                res.end();
            }
        }
        driver.forEach(function(element) {
            if (element.id == id) {
                res.json(element);
                res.end();
            }
        });
    })
    .patch(function(req, res){
      var currentDriver = driver.filter(function(item){
        console.log(req.params);
        return item.id == req.params.id;
      })[0];

      // driver by id found
      if(currentDriver) {
        var reqBody = req.body;
        for(var prop in reqBody) {
            if(reqBody[prop] !== undefined) {
                currentDriver[prop] = reqBody[prop]; // update driver info
            }
        }
        console.log(driver);
        res.sendStatus(200);
        res.json(driver);
        res.end();
      } else {
        res.sendStatus(404); // driver not found;
        res.end();
      }
    });
router.route('/driver/:id/car') //route to work with specific driver using an ID (for this case POST doesn't make sense)
    .get(function(req, res){
        var id = req.params.id;  //Read the value of the param defined in the route :id      
        var curCar;
        var curDriver = driver.filter(function(item) {
            return item.id == id;
        })[0];
        curCar = cars.filter(function(item) {
            return item.id == curDriver.car_id;
        })[0];

        res.json(curCar);
        res.end();
    })
    .post(function(req, res){
        cars.push(req.body);
        res.json(cars[cars.length-1]);
        
        res.sendStatus(201); 
        res.end();//Example of how to send an specific status code by default always returns 200
    });
/*
routes of passenger
**/

router.route('/passenger') //each entity should have specific and generic paths or routes.
    .get(function(req, res){
        //Get all the passengers
        res.json();  //return a json object
    })
    .post(function(req, res){
        console.log(req.body.name);
        console.log(req.body.location);

        res.sendStatus(201);
});
router.route('/passenger/:id')
    .get(function(req, res){
        var id = req.params.id;
        passenger.forEach(function(element){
            if (element.id == id) {
                res.json(element);
                res.end();
            }
        });
    })
    .patch(function(req, res){

    })
    .put(function(req, res){

    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Service running on port ' + port);

module.exports = app;






