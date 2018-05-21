const express = require('express');
const router = express.Router();
var Socket = require('../routes/devicesocket');
const fs = require('fs');

function JSONparse(fname) {
  return JSON.parse(fs.readFileSync(fname));
}

router.get('/places', ensureAuthenticated, function(req, res) {
  res.redirect('/');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		res.redirect('/');
	} else {
		req.flash('error_msg','Ви не ввійшли');
		res.redirect('/');
	}
}

module.exports = router;
