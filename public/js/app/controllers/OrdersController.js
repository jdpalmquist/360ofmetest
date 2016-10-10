angular.module('360ofme')
.controller('OrdersController', [
'$scope',
'$http', 
'$location',
function($scope, $http, $location){

	$scope.list = [];

	$scope.get_orders = function(){
		socket.emit('get orders', function(data){
			console.log('SOCKET.IO --> get orders --> data: ', data);
			$scope.list = data;
			$scope.$apply();
		});
	};

	jQuery(document).ready(function(){
		$scope.get_orders();
	});
}]);