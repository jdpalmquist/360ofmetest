angular.module('360ofme')
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'js/app/views/orders.client.view.html',
        controller: 'OrdersController'
      }).
      when('/orders', {
        templateUrl: 'js/app/views/orders.client.view.html',
        controller: 'OrdersController'
      }).
      when('/orders/:id',{
        templateUrl: 'js/app/views/ordersdetail.client.view.html',
        controller: 'OrdersdetailController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);