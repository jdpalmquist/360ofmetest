angular.module('360ofme')
.controller('OrdersController', [
'$scope',
'$http', 
'$location',
function($scope, $http, $location){

	$scope.list = [];
	$scope.account_id = '';
	$scope.accounts = [];
	$scope.products = [];
	$scope.added_products = [];

	$scope.order_name = '';

	$scope.goto = {
		orders: function(){ $location.path('/orders'); },
		create_order: function(){ $location.path('/create/order'); },
	};


	$scope.validate = {
		create_new_order: function(){
			if($scope.order_name != ''){
				return true;
			}
			else{
				alert("Name cannot be blank!");
			}

		},
	};


	$scope.add_product = function(){
		//Get the currently selected product
		var aproduct = $scope.product_id;
		var p = null;
		if(aproduct != null && aproduct != ''){
			for(var i = 0; i < $scope.products.length; i++){
				if(aproduct == $scope.products[i].Id){
					p = $scope.products[i];
				}
			}
		}


		//add the product to "added_products"
		if(p != null){
			$scope.added_products.push(p);
			//reset the product-add select
			$scope.produce_id = '';
			//apply
			//$scope.$apply(); // god, this is gross... not clean, just need to get the test done!
		}
	};

	
	$scope.create_order = function(){
		if($scope.validate.create_new_order()){			
			var data = {
				"Name": $scope.order_name,
				"AccountID": $scope.account_id,
			};

			/*
			if($scope.added_products.length > 0){
				for(var i = 0; i < $scope.added_products.length; i++){
					data.order[0].OrderItems.records.push({
						"attributes": {
		               		"type": "OrderItem"
		            	},
		            	"PricebookEntryId": $scope.added_products[i].Id,
		            	"quantity": "1",
		            	"UnitPrice": "15.99"
					});
				}
			}
			*/


			socket.emit('/server/create/order', data);
			setTimeout(function(){
				//give it 1/4 second to receive and process the request before changing location to that page
				socket.emit('/server/get/orders');
				$location.path('/orders');
			}, 250);
		}
	};
	


	socket.on('/client/get/accounts/response/create/order', function(res){
		console.log('ORDERS CONTROLLER --> get accounts response --> res: ', res);
		if(res.response == "success"){
			$scope.accounts = res.data;
			$scope.$apply();
		}
	});

	socket.on('/client/get/products/response/create/order', function(res){
		console.log('ORDERS CONTROLLER --> get products response --> res: ', res);
		if(res.response == "success"){
			$scope.products = res.data;
			$scope.$apply();
		}
	});


	socket.on('/client/create/order/response', function(response){
		console.log(response);
	});
	
	socket.on('/client/get/orders/response', function(response){
		console.log(response);
		$scope.list = response.data;
		$scope.$apply(); // gross, I need a better way to integrate socketio with angular digest loop
	});

	jQuery(document).ready(function(){
		//load the initial list of orders
		socket.emit('/server/get/orders');

		//get the list of accounts for the create-order page
		socket.emit('/server/get/accounts/for/orders/page');
		//get the list of products for the create-order page
		socket.emit('/server/get/products/for/orders/page');
	});
}]);