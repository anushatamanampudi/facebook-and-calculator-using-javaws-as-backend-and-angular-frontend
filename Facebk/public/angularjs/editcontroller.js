var d = angular.module('about',[]);
d.controller('editcontroller',['$scope','$http',function($scope,$http){
	
	console.log("hi");
	function ClickToEditCtrl($scope) {
		  $scope.title = "Welcome to this demo!";
		  $scope.editorEnabled = false;
		  
		  $scope.enableEditor = function() {
		    $scope.editorEnabled = true;
		    $scope.editableTitle = $scope.title;
		  };
		  
		  $scope.disableEditor = function() {
		    $scope.editorEnabled = false;
		  };
		  
		  $scope.save = function() {
		    $scope.title = $scope.editableTitle;
		    $scope.disableEditor();
		  };
		}
	
}]);