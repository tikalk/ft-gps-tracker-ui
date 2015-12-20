var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config.js')
var fs = require("fs");
var Q = require("q");
var request = require('request');


var configurationFile = 'configuration.json';

var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
);

var managementSrvHost = configuration.management.host;
var managementSrvPort = configuration.management.port;

var gpsSrvHost = configuration.gps.host;
var gpsSrvPort = configuration.gps.port;

var segmentSrvHost =  configuration.segment.host;
var segmentSrvPort =  configuration.segment.port;


var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))





// IN: http://localhost:3000/api/v1/guardians?username=g1
// OUT: http://52.35.175.134:3080/api/v1/guardians?username=g1
app.get('/api/v1/guardians', function (req, res) {

    console.log('Enter *** getGuardian ***');

    Q.nfcall(request,{ headers: {
                             'Accept': 'application/json',
                             'Content-Type': 'application/json'
                           },
                           url: 'http://'+managementSrvHost+':'+managementSrvPort+'/api/v1/guardians?username='+req.query.username,
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
                           url: 'http://'+gpsSrvHost+':'+gpsSrvPort+'/gps/vehicle/'+req.params.id + '?start='+start+'&stop='+stop,
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

app.use(function(req, res) {
  res.sendFile(__dirname + '/index.html')
})


app.listen(port, function(error) {

    if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
