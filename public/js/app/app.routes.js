angular.module('360ofme')
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'js/app/views/index.client.view.html',
        controller: 'IndexController'
      }).
      when('/index', {
        templateUrl: 'js/app/views/index.client.view.html',
        controller: 'IndexController'
      }).
      when('/accounts', {
        templateUrl: 'js/app/views/accounts.client.view.html',
        controller: 'AccountsController'
      }).
      when('/create/account', {
        templateUrl: 'js/app/views/account.create.client.view.html',
        controller: 'AccountsController'
      }).
      when('/orders', {
        templateUrl: 'js/app/views/orders.client.view.html',
        controller: 'OrdersController'
      }).
      when('/orders/:id',{
        templateUrl: 'js/app/views/order.detail.client.view.html',
        controller: 'OrderdetailController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);