angular.module('360ofme')
.controller('AccountsController', [
'$scope',
'$http', 
'$location',
function($scope, $http, $location){
	$scope.new_account_name = '';

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
			}
		},
	};


	//socket response handlers
	socket.on('/client/create/account/response', function(response){
		console.log(response);
	});
}]);