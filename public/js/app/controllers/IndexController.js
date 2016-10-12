angular.module('360ofme')
.controller('IndexController', [
'$scope',
'$location',
function($scope, $location){
	$scope.goto_accounts = function(){$location.path('/accounts');};
	$scope.goto_orders = function(){$location.path('/orders');}
}]);