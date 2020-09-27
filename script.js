var express = require('express');
var handlebars = require('handlebars');
var expressHandlebars = require('express-handlebars');
var mysql = require('mysql');
var path = require('path');

var app = express();

app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

var connection = mysql.createConnection({
  //properties...
  host: 'classmysql.engr.oregonstate.edu', //do not change
  user: 'cs340_campav', //change this to your phpmyadmin username
  password: '7365', //change this to your phpmyadmin password
  database: 'cs340_campav' //change this to your phpadmin database
});


connection.connect(function(error) //check if the port connected properly
{
  if(error)
  {
    console.log('error connecting to db');
  }
  else
  {
    console.log('connected to db');
  }
  //callback
});

app.get('/', function(req,res,next) { //trying to to run this on browser but does not work
  connection.query("SELECT * FROM Cs340_Regular", function(error, rows, fields) {
    if(error) {
      console.log('error in the query');
    }
    else {
      console.log('sucessful query');
      console.log(rows);
			res.status(200).render('home',
      {
        users: rows,
	      regular: 1,
	      limited: 0,
	      cTitle: 'Regular',
        scripts: [
          {file_name: "/home.js"}
        ]
      });
    }
  });
});

app.get('/regular/:n', (req, res, next) => {
  var n = req.params.n;
   connection.query("SELECT * FROM Cs340_User, Cs340_Regular WHERE Cs340_User.UserID = Cs340_Regular.UserID AND '" + n + "' = rID GROUP BY Cs340_Regular.rID", [], function (err, rows1) {
       connection.query("SELECT * FROM Cs340_User, Cs340_rTrans WHERE Cs340_User.UserID = Cs340_rTrans.UserID AND Cs340_rTrans.purchaseNum != 0 AND '" + n + "' = rID ", function (err, rows2) {
         console.log('sucessful query');
         //console.log("content", rows);
         //console.log("n is:", n);
         res.status(200).render('item',
         {
           transcript: rows2,
           rName: rows1[0].rName,
           rPrice: rows1[0].rPrice,
           quantity: "INFINITE",
           creator: rows1[0].UserName,
           scripts: [
             {file_name: "/item.js"}
           ]
         });
       });
   });
});

app.get('/l-list', function(req,res,next) {
	connection.query("SELECT * FROM Cs340_Limited", function(error, rows, fields) {
		if(error) {
			console.log('error in the query');
		}
		else {
			console.log('successful query');
			console.log(rows);
			res.status(200).render('home',
			{
				users: rows,
				regular: 0,
				limited: 1,
				cTitle: 'Limit',
				scripts: [
					{file_name: "/home.js"}
				]
			});
		}
	});
});

//SELECT * FROM Cs340_User, Cs340_limTrans WHERE Cs340_User.UserID = Cs340_limTrans.UserID AND Cs340_limTrans.purchaseNum != 0 AND LimID = 0

app.get('/limited/:n', (req, res, next) => {
  var n = req.params.n;
   connection.query("SELECT * FROM Cs340_User, Cs340_Limited WHERE Cs340_User.UserID = Cs340_Limited.UserID AND '" + n + "' = limID GROUP BY Cs340_Limited.limID", [], function (err, rows1) {
       connection.query("SELECT * FROM Cs340_User, Cs340_limTrans WHERE Cs340_User.UserID = Cs340_limTrans.UserID AND Cs340_limTrans.purchaseNum != 0 AND LimID = '" + n + "'", function (err, rows2) {
         console.log('sucessful query');
         //console.log("content", rows);
         //console.log("n is:", n);
         res.status(200).render('item',
         {
           transcript: rows2,
           rName: rows1[0].limName,
           rPrice: rows1[0].limPrice,
           quantity: rows1[0].limQuantity,
           creator: rows1[0].UserName,
           scripts: [
             {file_name: "/item.js"}
           ]
         });
       });
   });
});

app.get('/s-list', function(req,res,next) {
	connection.query("SELECT * FROM Cs340_Special", function(error, rows, fields) {
		if(error) {
			console.log('error in the query');
		}
		else {
			console.log('successful query');
			console.log(rows);
			res.status(200).render('home',
			{
				users: rows,
				regular: 0,
				limited: 0,
				cTitle: 'Special',
				scripts: [
					{file_name: "/home.js"}
				]
			});
		}
	});
});

app.get('/special/:n', (req, res, next) => {
  var n = req.params.n;
   connection.query("SELECT * FROM Cs340_User, Cs340_Special WHERE Cs340_User.UserID = Cs340_Special.UserID AND '" + n + "' = sID GROUP BY Cs340_Special.sID", [], function (err, rows1) {
       connection.query("SELECT * FROM Cs340_User, Cs340_sTrans WHERE Cs340_User.UserID = Cs340_sTrans.UserID AND Cs340_sTrans.purchaseNum != 0 AND sID = '" + n + "'", [], function (err, rows2) {
         console.log('sucessful query');
         console.log("BOIDDII", rows2);
         //console.log("content", rows);
         //console.log("n is:", n);
         res.status(200).render('item',
         {
           transcript: rows2,
           rName: rows1[0].sName,
           rPrice: rows1[0].sPrice,
           quantity: rows1[0].sQuantity,
           creator: rows1[0].UserName,
           scripts: [
             {file_name: "/item.js"}
           ]
         });
       });
   });
});

app.get('/createReg/*/*/*/*', function(req,res,next) {
  console.log(req.originalUrl);
  var data = req.originalUrl.split("/");
  var regID = 0;
  var uID = 0;
  connection.query("SELECT MAX(rID) AS regCount FROM Cs340_Regular" , function(error, rows, fields) {
    regID = (rows[0].regCount) + 1;
  });

  connection.query("SELECT UserName, UserPword, UserID FROM Cs340_User WHERE UserName = '" + data[2] + "' AND UserPword = '" + data[3] + "'", function(error, rows, fields) {
    if(error) {
      console.log('error in the query # 1');
    }
    else if (!(rows[0])) {
      console.log('That user does not exist!');
    }
    else {
      uID = rows[0].UserID;
      connection.query("INSERT INTO Cs340_Regular(rID, rName, rPrice) VALUES ('" + regID + "', '" + data[4] + "', '" + data[5] + "')", function(error, morerows, fields) {
        if(error) {
          console.log('error in the query # 2');
        }
      });
      connection.query("INSERT INTO Cs340_rTrans(UserID, rPrice, purchaseNum, rID) VALUES ('" + uID + "', '" + data[5] + "', '0', '" + regID + "')", function(error, morerows, fields) {
        if(error) {
          console.log('error in the query # 3');
        }
      });
    }
  });
  res.redirect('/');
});

app.get('/createLim/*/*/*/*', function(req,res,next) {
  console.log(req.originalUrl);
  var data = req.originalUrl.split("/");
  var limitID = 0;
  var uID = 0;
  connection.query("SELECT MAX(limID) AS limCount FROM Cs340_Limited" , function(error, rows, fields) {
    limitID = (rows[0].limCount) + 1;
  });

  connection.query("SELECT UserName, UserPword, UserID FROM Cs340_User WHERE UserName = '" + data[2] + "' AND UserPword = '" + data[3] + "'", function(error, rows, fields) {
    if(error) {
      console.log('error in the query # 1');
    }
    else if (!(rows[0])) {
      console.log('That user does not exist!');
    }
    else {
      uID = rows[0].UserID;
      connection.query("INSERT INTO Cs340_Limited(limID, limName, limPrice, limQuantity, UserID) VALUES ('" + limitID + "', '" + data[4] + "', '" + data[5] + "', '30', '" + uID + "')", function(error, morerows, fields) {
        if(error) {
          console.log('error in the query # 2');
        }
      });
      connection.query("INSERT INTO Cs340_limTrans(UserID, limPrice, limID, purchaseNum) VALUES ('" + uID + "', '" + data[5] + "', '" + limitID + "', '0')", function(error, morerows, fields) {
        if(error) {
          console.log('error in the query # 3');
        }
      });
    }
  });
  res.redirect('/');
});

app.get('/createSpe/*/*/*/*', function(req,res,next) {
  console.log(req.originalUrl);
  var data = req.originalUrl.split("/");
  var seqID = 0;
  var uID = 0;
  connection.query("SELECT MAX(sID) AS speCount FROM Cs340_Special" , function(error, rows, fields) {
    seqID = (rows[0].speCount) + 1;
  });

  connection.query("SELECT UserName, UserPword, UserID FROM Cs340_User WHERE UserName = '" + data[2] + "' AND UserPword = '" + data[3] + "'", function(error, rows, fields) {
    if(error) {
      console.log('error in the query # 1');
    }
    else if (!(rows[0])) {
      console.log('That user does not exist!');
    }
    else {
      uID = rows[0].UserID;
      connection.query("INSERT INTO Cs340_Special(sID, sName, sPrice, sQuantity, UserID) VALUES ('" + seqID + "', '" + data[4] + "', '" + data[5] + "', '30', '" + uID + "')", function(error, morerows, fields) {
        if(error) {
          console.log('error in the query # 2');
        }
      });
      connection.query("INSERT INTO Cs340_sTrans(UserID, limPrice, limID, purchaseNum) VALUES ('" + uID + "', '" + data[5] + "', '" + seqID + "', '0')", function(error, morerows, fields) {
        if(error) {
          console.log('error in the query # 3');
        }
      });
    }
  });
  res.redirect('/');
});

app.get('/createUsr/*/*', function(req,res,next) {
  console.log(req.originalUrl);
  var data = req.originalUrl.split("/");
  var uID = 0;
  connection.query("SELECT MAX(UserID) AS userCount FROM Cs340_User" , function(error, rows, fields) {
    uID = (rows[0].userCount) + 1;
  });

  connection.query('SELECT UserName FROM Cs340_User WHERE UserName = "' + data[2] + '"', function(error, rows, fields) {
    console.log(uID);
    if(error) {
      console.log('error in the query');
    }
    else if (rows[0]) {
      console.log("username already taken!");
    }
    else {
      connection.query("INSERT INTO Cs340_User(UserID, UserName, UserPword) VALUES ('" + uID + "', '" + data[2] + "', '" + data[3] + "')", function(error, morerows, fields) {
        if(error) {
          console.log('error in the query');
        }
      });
    }
    res.redirect('/');
  });
});

/*DO NOT UNCOMMENT THIS UNTIL PROJECT IS COMPLETELY DONE AND CHANGE THE SECONDS TO BE AN 6 MINUTES or something reasonable*/
/*
function RemoveSpecials() {
  console.log('CONTENT DELETED!');
  connection.query("DELETE FROM Cs340_Special");
  connection.query("DELETE FROM Cs340_sTrans");
}

setInterval(RemoveSpecials, 60000); //delete special items and transactions in 60 seconds!! BE CAUTION IF YOU UNCOMMENT THIS
*/

const port = process.env.PORT || 13377;
app.listen(port, function() {
	console.log('== Server is listening on port', port);
});

//steps to connect
//1. connect to schools vpn (if at home)
//2. change the user password and database to your name/password.
//3. make sure the package.json and script.js is not on your local computer but schools ssh
//4. type npm install
//5. type node script.js
//6. should say connected
//7. currently trying to connect to classmysql.engr.oregonstate.edu:13379 but does not work
