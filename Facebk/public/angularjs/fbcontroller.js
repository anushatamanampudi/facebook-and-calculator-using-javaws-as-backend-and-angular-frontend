

var login = angular.module('Facebook',[]);
  var k;
 login.controller('fbcontroller',['$scope','$http',function($scope,$http){
	
	  
	  $scope.login = function(){
	  $scope.unexpected_error = true;
	  $scope.invalid_login = true;
	 $http.post('/api/login',{"email":$scope.emailid,"password":$scope.password}).success(function(response){
		  
		 if (response.statusCode == 401) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
				$scope.error="Invalid login";
			}
			else
				window.location.assign("/dashboard"); 
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$scope.error="Invalid login";
		});
		        	
		  
	  };
 
      $scope.signup= function(){ 
			
			  console.log($scope.mail1);
			  console.log($scope.pwd);
			  console.log($scope.fname);
			  console.log($scope.lname);
			  //console.log($scope.gender);
			  $http.post('/api/signup',{"fname":$scope.fname,"lname":$scope.lname,"pwd":$scope.pwd,"mail1":$scope.mail1}).success(function(res){
		  
		    	k=res;
		    	$scope.k=k;
		    	
		    
		  })};
 

	  
  }]);
