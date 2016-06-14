var Topics = require('../models/mod_irrad.js');

var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Medidor' });
});


// GET Lista de irrad de la DB
router.get('/irrad1', function(req, res){
//agrego las cabeceras para que no aparezca error "Access-COntroll....
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  Topics.find({SenNum: "irrad1"},{IrradTime: 1, IrradValue: 1, _id: 0}, function(err, docs) {
    res.json(docs);
  });
});
module.exports = router;
