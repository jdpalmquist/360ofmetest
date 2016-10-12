angular.module('360ofme')
.controller('OrdersController', [
'$scope',
'$http', 
'$location',
function($scope, $http, $location){

	$scope.list = [];
	$scope.account_id = '';
	$scope.accounts = [];

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

	
	$scope.create_order = function(){
		if($scope.validate.create_new_order()){			
			var data = {
				"order": [
				    {
				      	"attributes": {
				      		"type": "Order"
				      	},
				      	"Name": $scope.order_name,
				      	"EffectiveDate": moment().format('YYYY-MM-DD'),
				      	"Status": "Draft",
				      	"billingCity": "SFO-Inside-OrderEntity-1",
				      	"accountId": $scope.account_id,
				      	/*"Pricebook2Id": "01sD0000000G2NjIAK",*/ // docs say that pricebook has been deprecated since v8.0?
				      	"OrderItems": {
				         	"records": [
					            
				         	]
				      	}
				   	}
				]
			};


			socket.emit('/server/create/order', data);
		}
	};
	


	socket.on('/client/get/accounts/response/create/order', function(res){
		console.log('ORDERS CONTROLLER --> get accounts response --> res: ', res);
		if(res.response == "success"){
			$scope.accounts = res.data;
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

		//get the list of account numbers for the create-order page
		socket.emit('/server/get/accounts/for/orders/page');
		
	});
}]);