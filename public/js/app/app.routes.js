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
      when('/accounts/:id',{
        templateUrl: 'js/app/views/account.detail.client.view.html',
        controller: 'AccountsController'
      }).
      when('/contracts',{
        templateUrl: 'js/app/views/contracts.client.view.html',
        controller: 'ContractsController'
      }).
      when('/create/contract',{
        templateUrl: 'js/app/views/contract.create.client.view.html',
        controller: 'ContractsController'
      }).
      when('/contracts/:id',{
        templateUrl: 'js/app/views/contract.detail.client.view.html',
        controller: 'ContractsController'
      }).
      when('/orders', {
        templateUrl: 'js/app/views/orders.client.view.html',
        controller: 'OrdersController'
      }).
      when('/create/order', {
        templateUrl: 'js/app/views/order.create.client.view.html',
        controller: 'OrdersController'
      }).
      when('/orders/:id',{
        templateUrl: 'js/app/views/order.detail.client.view.html',
        controller: 'OrderdetailController'
      }).
      when('/products', {
        templateUrl: 'js/app/views/products.client.view.html',
        controller: 'ProductsController'
      }).
      when('/create/product', {
        templateUrl: 'js/app/views/product.create.client.view.html',
        controller: 'ProductsController'
      }).
      when('/products/:id',{
        templateUrl: 'js/app/views/product.detail.client.view.html',
        controller: 'ProductdetailController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);