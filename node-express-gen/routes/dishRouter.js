var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var router = express.Router();

router.use(bodyParser.json());

router.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})
.get(function(req,res,next){
        res.end('Will send all the dishes to you!');
})
.post(function(req, res, next){
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete(function(req, res, next){
        res.end('Deleting all dishes');
});

router.route('/:id')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})
.get(function(req,res,next){
        res.end('Will send details of the dish: ' + req.params.id +' to you!');
})
.put(function(req, res, next){
        res.write('Updating the dish: ' + req.params.id + '\n');
    res.end('Will update the dish: ' + req.body.name +
            ' with details: ' + req.body.description);
})
.delete(function(req, res, next){
        res.end('Deleting dish: ' + req.params.id);
});

module.exports = router;
