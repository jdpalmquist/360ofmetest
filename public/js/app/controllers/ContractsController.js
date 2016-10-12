angular.module('360ofme')
.controller('ContractsController', [
'$scope',
'$http', 
'$location',
function($scope, $http, $location){
	


	


	jQuery(document).ready(function(){
		socket.emit('/server/get/contracts');
	});

}]);