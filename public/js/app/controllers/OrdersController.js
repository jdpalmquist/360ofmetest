angular.module('360ofme')
.controller('OrdersController', [
'$scope',
'$http', 
'$location',
function($scope, $http, $location){

	$scope.list = [];

	jQuery(document).ready(function(){
		//load the initial list of orders
		socket.emit('/socketio/get/orders');
		
	});

	
	//socket response handlers
	socket.on('/socketio/get/orders/response', function(response){
		console.log(response);
		$scope.list = response.data;
		$scope.$apply(); // gross, I need a better way to integrate socketio with angular digest loop
	});

}]);