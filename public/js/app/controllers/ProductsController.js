angular.module('360ofme')
.controller('ProductsController', [
'$scope',
'$http', 
'$location',
function($scope, $http, $location){

	$scope.list = [];
	

	jQuery(document).ready(function(){
		//load the initial list of products
		socket.emit('/server/get/products');		
	});
}]);