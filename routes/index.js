var express = require('express');
var router = express.Router();
var XLSX = require('xlsx');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/saveExcel', function(req, res) {
  var workbook = req.param('workbook');
  var fileName = 'public/excels' + Date.now().toString() + ".xlsx";
  XLSX.writeFile(workbook, 'public/excels/out.xlsx');
  res.send("success get the request");
});

module.exports = router;
