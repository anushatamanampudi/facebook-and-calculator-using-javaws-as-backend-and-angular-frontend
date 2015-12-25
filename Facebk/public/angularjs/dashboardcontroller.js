/**
 * New node file
 */


var dashboard = angular.module('dashboardapp',[]);
 dashboard.controller('dashboardcontroller',['$scope','$http',function($scope,$http){
	 
	 $scope.search=function(){
		 
		$http.post('/search/'+$scope.srchterm).success(function(response){
			  //alert(response);
			console.log(response);
			 if(response =="No such member exists")
				 {
				   alert(response);
				 }
			 if(response =="your page")
			 {
				 window.location.assign("/profile");
			 }
			 else{
			   window.location.assign("/dashboard2"); 
			 }
			    
		 });
	 }
	 $scope.accept=function(event){
		      
			$http.post('/accfrnd',{id:event.target.id}).success(function(response){
				   
				    
			 });
		 }
	 $scope.post=function(){
		 //alert($scope.text);
		 $http.post('/postupdate',{text:$scope.text}).success(function(response){
			   
			    
		 });
	 };
	 
	 
	 
 }]);