
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  ,http = require('http')
  , path = require('path')
  //Importing the 'client-sessions' module
  , session = require('client-sessions')
  , mysql = require('mysql')
  , profile=require('./routes/profile')
  , groups=require('./routes/groups')
  , status=require('./routes/status')
  , about=require('./routes/about')
  , dashboard= require('./routes/dashboard')
  ,addfriend=require('./routes/addfriend')
  ,signup=require('./routes/signup')
  ,getgroup=require('./routes/getgroup')
  ,login=require('./routes/login');
  
var app = express();

app.use(session({   
	  
	cookieName: 'fbsession',    
	secret: 'hash@fb',    
	duration: 5 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000 }));

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.use(function(req, res, next) {
	  if (req.fbsession && req.fbsession.email) {
		  //console.log(req.fbsession.email);
		  var getuser="SELECT Username from users where Username='" + req.fbsession.email+"';";
		  console.log("i am in sesion");
	      if (getuser) {
	    	req.email=getuser;
	        req.fbsession.email = getuser;  //refresh the session value
	        
	      }
	      // finishing processing the middleware and run the route
	      next();
	  } else {
	    next();
	  }
	});

function requireLogin (req, res, next) {
	  if (!req.fbsession.email) {
		console.log(req.fbsession.email);
	    res.redirect('/');
	  } 
	    next();
	  
	};
app.get('/',routes.index);
app.use('/api',login.login);
app.get('/dashboard',dashboard.dashboard);
app.post('/signup',signup.signup);
app.post('/postupdate',status.post);
//app.post('/newsfeed',status.newsfeed);
app.post('/addfriend',addfriend.addfriend);
app.post('/checkfrnd',addfriend.checkfrnd);
app.post('/accfrnd',dashboard.accfrnd);
app.get('/creategroup',requireLogin,groups.creategroup);
app.post('/groupcreation',requireLogin,groups.groupcreation);
app.post('/groupdeletion',requireLogin,groups.groupdeletion);
app.post('/addmem',requireLogin,groups.addmem);
app.post('/del',requireLogin,groups.del);
app.post('/show',requireLogin,groups.showmem);
app.post('/showgrps',groups.showgrps);
//app.get('/groupform',getgroup.getgroup);
//app.get('/groupcreation',groups.groupcreation);
//app.get('/users', user.list);

//app.post('/login',login.login );
app.get('/logout', function(req, res) {
	  req.fbsession.reset();
	  res.redirect('/');
	});
app.get('/profile', profile.profile);
app.get('/about',about.about);
app.post('/search/:id',dashboard.frnddashboard);
app.get('/dashboard2',dashboard.dashboard2);
app.get('/about',login.about);
app.post('/addevents',login.addevents);
app.post('/addwande',login.addwrk);
app.post('/addcontacts',login.addcontactinfo);
app.post('/addinterests',login.addinterests);
app.post('/delevents',login.delevents);
app.post('/delwande',login.delwande);
app.post('/delcontacts',login.delcontacts);
app.post('/delinterests',login.delinterests);
		
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  
});


