let express = require('express');
let router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
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
