
/*
 * GET users listing.
 */
var soap = require('soap');
exports.add = function(req, res){
	var option = {
			ignoredNamespaces : true	
		};
	baseURL="http://localhost:8080/CalculatorApplication/services";
	 var url = baseURL+"/calcvalidation?wsdl";
	  var args = {a: req.body.a,b: req.body.b};
	  soap.createClient(url,option, function(err, client) {
	      client.add(args, function(err, result) {
	    	  console.log(result);
	    	  
	    	  
	    	  res.send({a:JSON.stringify(result.addReturn),b:"add"});
	    	 
	    	  
	    		  
	    	  
	      });
	  });

 
  
  
  
}
exports.mul = function(req, res){

	 // var a=req.body.a;
	  //var b=req.body.b;
	  var option = {
				ignoredNamespaces : true	
			};
		baseURL="http://localhost:8080/CalculatorApplication/services";
		 var url = baseURL+"/calcvalidation?wsdl";
		  var args = {a: req.body.a,b: req.body.b};
		  soap.createClient(url,option, function(err, client) {
		      client.mul(args, function(err, result) {
		    	  console.log(result);
		    	  
		    	  
		    	  res.send({a:JSON.stringify(result.mulReturn),b:"mul"});
		    	 
		    	  
		    		  
		    	  
		      });
  
		  });
};
exports.div = function(req, res){
	var a=req.body.a;
	  var b=req.body.b;
	  //var c=parseInt(a)/parseInt(b);
	  //console.log(c);
	  var option = {
				ignoredNamespaces : true	
			};
		baseURL="http://localhost:8080/CalculatorApplication/services";
		 var url = baseURL+"/calcvalidation?wsdl";
		  var args = {a: req.body.a,b: req.body.b};
		  soap.createClient(url,option, function(err, client) {
		      client.div(args, function(err, result) {
		    	  console.log(result);
		    	  if(b==0){
		    		  res.send({a:JSON.stringify("Divide by Zero Error"),b:"error"});
		    	  }
		    	  if(parseInt(a)==0 && parseInt(b)==0){
		    		  res.send({a:JSON.stringify("Cannot divide two zeros! Please give proper inputs"),b:"error"});
		    	  }
		    	  else{
		    		  res.send({a:JSON.stringify(result.divReturn),b:"div"});
		    	  }
		    	  
		    	  
		    	 
		    	  
		    		  
		      });
		      });
	 /* if(c=="Infinity"){
		  res.send({a:JSON.stringify("Divide by Zero Error"),b:"error"});
	  }
	  if(parseInt(a)==0 && parseInt(b)==0){
		  res.send({a:JSON.stringify("Cannot divide two zeros! Please give proper inputs"),b:"error"});
	  }
	  else{
		  res.send({a:JSON.stringify(c),b:"div"});
	  }*/
};


exports.sub=function(req, res){
	var option = {
			ignoredNamespaces : true	
		};
	baseURL="http://localhost:8080/CalculatorApplication/services";
	 var url = baseURL+"/calcvalidation?wsdl";
	  var args = {a: req.body.a,b: req.body.b};
	  soap.createClient(url,option, function(err, client) {
	      client.sub(args, function(err, result) {
	    	  console.log(result);
	    	  
	    	  
	    	  res.send({a:JSON.stringify(result.subReturn),b:"sub"});
	    	 
	    	  
	    		  
	    	  
	      });
	  });
};
 