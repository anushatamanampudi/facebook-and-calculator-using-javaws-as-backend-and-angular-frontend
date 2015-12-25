/**
 * 
 */
var mysql = require('./mysql');
var soap = require('soap');
var baseURL = "http://localhost:8080/Server-Facebook/services";
//var uuid= require('node-uuid');
exports.login = function(req,res){
	   var email=req.body.email;
		var pwd=req.body.password;
		var json_response;
	var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/login?wsdl";
	  var args = {username: req.body.email,password: req.body.password};
	  soap.createClient(url,option, function(err, client) {
	      client.suggestFriends(args, function(err, result) {
	    	  var mydata=JSON.parse(result.suggestFriendsReturn)
	    	  if(mydata.results.length>0)
	    		  {
	    		  //var mydata=JSON.parse(result.suggestFriendsReturn);
	    		  req.fbsession.firstname=mydata.results[0].fname;
				  req.fbsession.lastname=mydata.results[0].lname;
				  req.fbsession.uid=mydata.results[0].uid;
				  console.log("Session initialized");
					json_response={"statusCode":200};
					res.send(json_response);
				  
	    	
	    		  }
	    	  else{
	    		  
	    		  console.log("Invalid Login");
	    		  res.send({statusCode:401});
					res.send("failure");
	    	  }
	      });
	  });
};


exports.about = function(req, res){
	
	mysql.fetchData(function(err,results){
		var life=[];
		var wande=[];
		var contact=[];
		var interest=[];
		console.log('Connected to mongo at: ' + mongoURL);
		 var coll = mongo.collection('users');
	coll.findOne({"username" : req.session.email}, function(err, user1){
		
		if(user1.lifeevents){
			for(var i=0;i<user1.lifeevents.length;i++){
				life.push(user1.lifeevents[i]);
				console.log(user1.lifeevents[i])
			}
			
		}
		
		
		if(user1.wande){
			for(var i=0;i<user1.wande.length;i++){
				wande.push(user1.wande[i]);
			}
			
		}
		
		
		if(user1.contact){
			for(var i=0;i<user1.contact.length;i++){
				contact.push(user1.contact[i]);
			}
			
		}
		
		
	if(user1.interests){
		for(var i=0;i<user1.interests.length;i++){
			interest.push(user1.interests[i]);
		}
		
	}
	
	

res.render("about1",{lifeevents:life,wande:wande,contact:contact,interest:interest});	
	});
	});
};
	
exports.addevents = function(req, res){
		
		name=req.param("user").replace(/[^a-zA-Z ]/g, "");
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll1 = mongo.collection('users');

			coll1.update({"username":req.session.email},{$push:{"lifeevents":name}}, function(err, user){
				

			});
		});
		res.redirect('/about');
	};
	
exports.addwrk = function(req, res){
		
		name=req.param("user").replace(/[^a-zA-Z ]/g, "");
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll1 = mongo.collection('users');

			coll1.update({"username":req.session.email},{$push:{"wande":name}}, function(err, user){
				

			});
		});
		res.redirect('/about');
	};
	
exports.addcontactinfo = function(req, res){
		
		name=req.param("user").replace(/[^a-zA-Z ]/g, "");
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll1 = mongo.collection('users');

			coll1.update({"username":req.session.email},{$push:{"contact":name}}, function(err, user){
				

			});
		});
		res.redirect('/about');
	};
	
exports.addinterests = function(req, res){
		
		name=req.param("user").replace(/[^a-zA-Z ]/g, "");
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll1 = mongo.collection('users');

			coll1.update({"username":req.session.email},{$push:{"interests":name}}, function(err, user){
				

			});
		});
		res.redirect('/about');
	};
	
exports.delevents = function(req, res){
		console.log(JSON.stringify(req.body).slice(2,JSON.stringify(req.body).indexOf(":")-1));
		name=JSON.stringify(req.body).slice(2,JSON.stringify(req.body).indexOf(":")-1);
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll1 = mongo.collection('users');

			coll1.update({"username":req.session.email},{$pull:{"lifeevents":name}}, function(err, user){
				

			});
		});
		res.redirect('/about');
	};
	
exports.delwande = function(req, res){
		
		name=JSON.stringify(req.body).slice(2,JSON.stringify(req.body).indexOf(":")-1);
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll1 = mongo.collection('users');

			coll1.update({"username":req.session.email},{$pull:{"wande":name}}, function(err, user){
				

			});
		});
		res.redirect('/about');
	};
	
exports.delcontacts = function(req, res){
		
		name=JSON.stringify(req.body).slice(2,JSON.stringify(req.body).indexOf(":")-1);
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll1 = mongo.collection('users');

			coll1.update({"username":req.session.email},{$pull:{"contact":name}}, function(err, user){
				

			});
		});
		res.redirect('/about');
	};
	
exports.delinterests = function(req, res){
		name=JSON.stringify(req.body).slice(2,JSON.stringify(req.body).indexOf(":")-1);
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll1 = mongo.collection('users');

			coll1.update({"username":req.session.email},{$pull:{"interests":name}}, function(err, user){
				

			});
		});
		res.redirect('/about');
		
	};
		
	
		


