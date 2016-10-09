angular.module('360ofme')
.controller('IndexController', [
'$scope',
'$http', 
'$location',
function($scope, $http, $location){

	$scope.get_orders = function(){
		var url = '/get/orders';
		var data = '';
		$http.get(url).success(function(res){
			if(res.response == "success"){
				//success action
				alert();
			}
			else{
				//????
				alert();
			}
		});
	};

	jQuery(document).ready(function(){
		$scope.get_orders();
	});
}]);