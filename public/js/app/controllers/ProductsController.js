angular.module('360ofme')
.controller('ProductsController', [
'$scope',
'$http', 
'$location',
function($scope, $http, $location){

	$scope.list = [];
	

	socket.on('/client/get/products/response', function(res){
		console.log('ProductsController --> client-get-products-response --> res: ', res);
		if(res.response == "success"){
			$scope.list = res.data;
			$scope.$apply(); // gross, I really really need a better way to integrate socketio with the angular digrest loop
		}

	});


	jQuery(document).ready(function(){
		//load the initial list of products
		socket.emit('/server/get/products');		
	});
}]);