var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config.js')

var guardiansSrvHost = "52.35.175.134";
var guardiansSrvPort = "3080";

var gpsAngelSrvHost = "52.35.175.134";
var gpsAngelSrvPort = "8080";

var segmentSrvHost = "52.35.175.134";
var segmentSrvPort = "9080";

var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))


var fs = require("fs");
var Q = require("q");
var request = require('request');


// IN: http://localhost:3000/api/v1/guardians?username=g1
// OUT: http://52.35.175.134:3080/api/v1/guardians?username=g1
app.get('/api/v1/guardians', function (req, res) {

    console.log('Enter *** getGuardian ***');

    Q.nfcall(request,{ headers: {
                             'Accept': 'application/json',
                             'Content-Type': 'application/json'
                           },
                           url: 'http://'+guardiansSrvHost+':'+guardiansSrvPort+'/api/v1/guardians?username='+req.query.username,
                           method: 'GET'
                         })
            .then(function(data) {

                      res.end( data[0].body);

            })
            .fail(function(err) {
              console.error('Error received:', err);
            })
            .done();

    console.log('Exit *** getGuardian ***');

})


// IN: http://localhost:3000/gps/angel/1?start=0&stop=160901120444
// OUT: http://52.35.175.134:8080/gps/vehicle/1?start=0&stop=160901120444
app.get('/gps/angel/:id', function (req, res) {

    console.log('Enter *** getAngels ***');

    var start = req.query.start;
    var stop = req.query.stop;


    Q.nfcall(request,{ headers: {
                             'Accept': 'application/json',
                             'Content-Type': 'application/json'
                           },
                           url: 'http://'+gpsAngelSrvHost+':'+gpsAngelSrvPort+'/gps/vehicle/'+req.params.id + '?start='+start+'&stop='+stop,
                           method: 'GET'
                         })
            .then(function(data) {

                     res.end( data[0].body);

            })
            .fail(function(err) {
              console.error('Error received:', err);
            })
            .done();

    console.log('Exit *** getAngels ***');

})

// IN: http://localhost:3000/segments/angel/1?start=0&stop=160901120444
// OUT: http://52.35.175.134:9080/segments/vehicle/1?start=0&stop=160902061802
app.get('/segments/angel/:id', function (req, res) {

   console.log('Enter *** getSegments ***');
   var start = req.query.start;
   var stop = req.query.stop;

    Q.nfcall(request,{ headers: {
                             'Accept': 'application/json',
                             'Content-Type': 'application/json'
                           },
                           url: 'http://'+segmentSrvHost+':'+segmentSrvPort+'/segments/vehicle/'+req.params.id + '?start='+start+'&stop='+stop,
                           method: 'GET'
                         })
            .then(function(data) {
                      res.end( data[0].body);

            })
            .fail(function(err) {
              console.error('Error received:', err);
            })
            .done();
         console.log('Exit *** getSegments ***');
})

var fs = require("fs");


//Integration instructions
//------------------------
// Integrate q library to work with reactive pattern

app.get('/api/v1/guardians', function (req, res) {
    console.log("&&&&");
    fs.readFile(__dirname + "/" + "vehicles.json", 'utf8', function (err, data) {

        var userName = req.query.username;
        console.log("1");
        var guardians = getVehicles(JSON.parse(data), userName);

        res.end(JSON.stringify(guardians));

    });
})


var getAngels = function getAngelByTimeRange(data, vehicleId, start, stop) {
    return data.filter(
        function (data) {
            return true;//data.vehicleId == vehicleId && data.readingTime > start && data.readingTime < stop
        }
    );
};


app.get('/gps/angel/:id', function (req, res) {

    fs.readFile(__dirname + "/" + "locationHistory.json", 'utf8', function (err, data) {

        var vehicleId = req.params.id;
        var start = req.query.start;
        var stop = req.query.stop;

        var angels = getAngels(JSON.parse(data), vehicleId, start, stop);

        res.end(JSON.stringify(angels));

    });
})


app.get('/segments/angel/:id', function (req, res) {

    fs.readFile(__dirname + "/" + "segments.json", 'utf8', function (err, data) {

        var angelId = req.params.id;
        var start = req.query.start;
        var stop = req.query.stop;

        var angels = JSON.parse(data);

        res.end(JSON.stringify(angels));

    });
})


var getVehicles = function getVehiclesByUsername(data, username) {
    return data.filter(
        function (data) {
            return data.username == username
        }
    );
};

app.use(function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(__dirname + '/index.html')
})


app.listen(port, function(error) {

    if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
