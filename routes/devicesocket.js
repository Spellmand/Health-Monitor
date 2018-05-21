const app = require('http').createServer();
const io = require('socket.io')(app);
const fs = require('fs');
const db = require('../models/user');
const port = 3000;
let express = require('express');
let router = express.Router();

app.listen(port);
console.log(`Server listener started on port on ${port}`);

function ParseJson(jsondata) {
  try {
    return JSON.parse(jsondata);
  } catch (error) {
    return null;
  }
}

io.on('connection', ensureAuthenticated, function(socket) {
  console.log("Connected device with ip", socket.conn.remoteAddress.slice(7), ` and id=${socket.id}`);
  socket.on('connection', function(data) {
    // console.log(work);
  });

  socket.on('json', function(data) {
    var jsonStr = JSON.stringify(data);
    var parsed = ParseJson(jsonStr);
    // db.writeIndicators(user,data, function(err, callback) {
    //   if (err) throw err;
    //   console.log(callback);
    // });
  });
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		res.redirect('/');
	} else {
		req.flash('error_msg','Ви не ввійшли');
		res.redirect('/');
	}
}
