/**
 * 
 */
var mysql = require('./mysql');
var soap = require('soap');
var baseURL = "http://localhost:8080/Server-Facebook/services";
var name;
var uid;
var query;
var newarr=[];
var flist =[];

var flist1=[];

exports.dashboard = function(req, res){
	 var email=req.body.email;
		var pwd=req.body.password;
		var json_response;
	var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/dashboard?wsdl";
	  var args = {uid1: req.fbsession.uid,firstname: req.fbsession.firstname};
	  soap.createClient(url,option, function(err, client) {
	      client.details(args, function(err, result) {
	    	  var mydata=JSON.parse(result.detailsReturn)
	    	  if(mydata.results.length>0)
	    		  {
	    		  //var mydata=JSON.parse(result.suggestFriendsReturn);
	    		 // req.fbsession.firstname=mydata.results[0].fname;
				  //req.fbsession.lastname=mydata.results[0].lname;
				  //req.fbsession.uid=mydata.results[0].uid;
				  //console.log("Session initialized");
	    		  var query="SELECT firstname from users where UserId IN (Select useridmine from friends where useridfrnd='" + req.fbsession.uid + "' and status ='0');";
					
					
					flist1=[];
					console.log(mydata.results.length);
					for(var i=0;i < mydata.results.length ;i++){
						
						flist1.push("'"+mydata.results[i].uid+"'");
					}
					var getposts="Select firstname,post from updates where useridfk in (" + flist1 + ");"; 
					mysql.fetchData(function(err,r){
						if(err){
							console.log("i am in flisterror")
							throw err;
						}
						else 
						{
							flist=[];
						    if(r.length >0){
							for(var i=0;i < r.length ;i++){
								
								flist.push(r[i]);
							}
							
						    }
						    else{
						    	console.log("no posts of friends record found");
						    	req.fbsession.flist=[];
						    	//req.fbsession.flist=flist;
						    }
						}  
					}, getposts);
					mysql.fetchData(function(err,resul){
						if(err){
							throw err;
						}
						else 
						{
							if(resul.length > 0)
							{
								var frndarr = [];
								for(var i=0;i < resul.length ;i++){
									
									frndarr.push(resul[i].firstname);
								}
								newarr=frndarr;
								
								console.log(flist);
								res.render('dashboard',{fname:req.fbsession.firstname,lname:req.fbsession.lastname,frndarr:frndarr,flist:flist});
								
								
							}
							else
								{
								console.log("no frnd requests record found");
								//console.log(req.fbsession.flist[1]);
								res.render('dashboard',{fname:req.fbsession.firstname,lname:req.fbsession.lastname,frndarr:[],flist:flist});
								}
						}  
					}, query);
					
	    	
	    		  }
	    	  else{
	    		  
	    		  console.log("Invalid Login");
	    		  res.send({statusCode:401});
					res.send("failure");
	    	  }
	      });
	  });
}

exports.frnddashboard = function(req, res){
	name=JSON.stringify(req.params.id);
	console.log(req.fbsession.firstname);
	if(req.params.id === req.fbsession.firstname){
		res.send("your page");
		
	}
	else{
		var option = {
				ignoredNamespaces : true	
			};
		 var url = baseURL+"/frnddashboard?wsdl";
		  var args = {name: name};
		  soap.createClient(url,option, function(err, client) {
		      client.friends(args, function(err, result) {
		    	  var mydata=JSON.parse(result.friendsReturn)
		    	  console.log(mydata)
		    	  if(mydata.results.length>0)
		    		  {
		    		  res.send(mydata.results[0].uid);	
					  
		    	
		    		  }
		    	  else{
		    		  
		    		  console.log("no record found");
						
		    	  }
		      });
		  });
		
	}
	 
};
exports.dashboard2 = function(req, res){
	var u="SELECT UserId from users where firstname=" + name + ";";
	 mysql.fetchData(function(err,result){
			if(err){
				throw err;
			}
			else 
			{
				if(result.length > 0)
				{
				 
					uid=result[0].UserId;
					console.log("user id "+uid);
					query="SELECT firstname from users where UserId IN (SELECT useridmine from friends where useridfrnd='" +uid+ "' and status='2' union SELECT useridfrnd from friends where useridmine='" +uid+ "' and status='2');";
					mysql.fetchData(function(err,resul){
						if(err){
							throw err;
						}
						else 
						{   
							if(resul.length > 0)
							{
								var farr = [];
								//q="SELECT firstname from users where UserId IN (Select useridfrnd from friends where useridmine='" + uid + "' and status ='2');";
								
								for(var i=0;i < resul.length ;i++){
									
									farr.push(resul[i].firstname);
								}
								var u="select grpname from grpmem where grpmemfirstname=" +name+ ";";
								 mysql.fetchData(function(err,results){
										if(err){
											throw err;
										}
										else 
										{
											if(results.length > 0)
											{
												var grp=[];
										       for(var i=0;i<results.length;i++){
										    	   grp.push(results[i].grpname);
										       }
												console.log(grp[0]);
												//res.send(JSON.stringify(grp));
												res.render('profile',{fname:name,farr:farr,grp:grp});
												
										    }
											else{
												//res.send("You have no groups");
												res.render('profile',{fname:name,farr:farr,grp:[]});
											}
										}
									}, u);
								//res.render('profile',{fname:name,farr:farr});
								
								
							}
							else
								{
								console.log("no record found");
								var u="select grpname from grpmem where grpmemfirstname=" +name+ ";";
								 mysql.fetchData(function(err,results){
										if(err){
											throw err;
										}
										else 
										{
											if(results.length > 0)
											{
												var grp=[];
										       for(var i=0;i<results.length;i++){
										    	   grp.push(results[i].grpname);
										       }
												console.log(grp[0]);
												//res.send(JSON.stringify(grp));
												res.render('profile',{fname:name,farr:[],grp:grp});
												
										    }
											else{
												//res.send("You have no groups");
												res.render('profile',{fname:name,farr:[],grp:[]});
											}
										}
									}, u);
								}
					}}, query);
				}
				else
					{
					console.log("no record found");
					}
			}  
			
			
		}, u);
	 
	  
	 // res.render('profile',{fname:name});
	  
	};
	
exports.accfrnd= function(req,res){
	id=req.body.id
	//console.log(id);
	var u="SELECT UserId from users where firstname='" + id + "';";
	 mysql.fetchData(function(err,result){
			if(err){
				throw err;
			}
			else 
			{
				if(result.length > 0)
				{
				 
					uid=result[0].UserId;
					console.log("user id "+uid);
					query="update friends set status = '2' where useridmine='" + uid + "' and  useridfrnd = (select UserId from users where firstname = '" +req.fbsession.firstname+ "');"; 
					mysql.fetchData(function(err,resul){
						if(err){
							throw err;
						}
						else 
						{
							
								for(var i in newarr){
									 if(newarr[i] == id){
										 newarr.splice(i,1);
									 }
								 }
								
								res.render('dashboard',{fname:req.fbsession.firstname,lname:req.fbsession.lastname,frndarr:newarr});
								
								
						}  
					}, query);
				}
				else
					{
					console.log("no record found");
					}
			}  
		}, u);
	 
	
};



