angular.module('360ofme')
.controller('ProductsController', [
'$scope',
'$http', 
'$location',
function($scope, $http, $location){

	$scope.list = [];
	$scope.product_name = null;
	$scope.product_family = null;
	$scope.product_description = null;



	$scope.validate = {
		create_product: function(){
			var chk1 = false,
				chk2 = false,
				chk3 = false,
				chk4 = false;

			if($scope.product_name != null && $scope.product_name != ''){
				chk1 = true;
			}
			else{
				chk1 = false;
			}

			
			if($scope.product_family != null && $scope.product_family != ''){
				chk2 = true;
			}
			else{
				chk2 = false;
			}

			if($scope.product_description != null && $scope.product_description != ''){
				chk3 = true;
			}
			else{
				chk3 = false;
			}

			if(chk1 && chk2 && chk3){
				return true;
			}
			else{
				return false;
			}
		},
	};


	$scope.create_product = function(){
		if($scope.validate.create_product()){

			var data = {
				"Name": $scope.product_name,
				"Family": $scope.product_family,
				"Description": $scope.product_description
			};

			socket.emit('/server/create/product', data);
			setTimeout(function(){
				socket.emit('/server/get/products');
				$location.path('/products');
			}, 250);
		}
	};


	socket.on('/client/create/product/response', function(res){
		console.log('ProductsController --> client-create-product-response --> res: ', res);
	});


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