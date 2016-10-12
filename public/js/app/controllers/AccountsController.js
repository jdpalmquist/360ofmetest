angular.module('360ofme')
.controller('AccountsController', [
'$scope',
'$http', 
'$location',
function($scope, $http, $location){
	$scope.new_account_name = '';

	$scope.account_list = [];

	$scope.goto = {
		accounts: function(){ $location.path('/accounts'); },
		create_account: function(){ $location.path('/create/account'); },	
	};


	$scope.validate = {
		create_account_inputs: function(){
			if($scope.new_account_name != null && $scope.new_account_name != ''){
				return true;
			}
			else{
				return false;
			}
		},
	};


	$scope.create = {
		account: function(){
			if($scope.validate.create_account_inputs()){
				var data = {
					"Name": $scope.new_account_name
				};

				socket.emit('/server/create/account', data);
				setTimeout(function(){
					socket.emit('/server/get/accounts');
					$location.path('/accounts');					
				}, 500);
			}
		},
	};


	//socket response handlers
	socket.on('/client/create/account/response', function(response){
		console.log(response);
	});
	socket.on('/client/get/accounts/response', function(res){
		console.log(res);
		if(res.response == "success"){
			$scope.account_list = res.data;
			$scope.$apply(); // eww, I need a better way to update the digest cycle...
		}
	});


	jQuery(document).ready(function(){
		socket.emit('/server/get/accounts');
	});

}]);