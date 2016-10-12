angular.module('360ofme')
.controller('OrdersController', [
'$scope',
'$http', 
'$location',
function($scope, $http, $location){

	$scope.list = [];

	jQuery(document).ready(function(){
		//load the initial list of orders
		//socket.emit('/server/get/orders');
		

		//DEBUG: test order creation
		var data = {};

		socket.emit('/server/create/order'); //no test data passed through!
		

		
	});

	
	

	socket.on('/client/create/order/response', function(response){
		console.log(response);
	});
	
	socket.on('/client/get/orders/response', function(response){
		console.log(response);
		$scope.list = response.data;
		$scope.$apply(); // gross, I need a better way to integrate socketio with angular digest loop
	});

}]);