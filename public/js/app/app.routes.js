angular.module('360ofme')
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'js/app/views/login.client.view.html',
        controller: 'IndexController'
      }).
      when('/logout', {
        templateUrl: 'js/app/views/login.client.view.html',
        controller: 'IndexController'
      }).
      when('/', {
        templateUrl: 'js/app/views/index.client.view.html',
        controller: 'IndexController'
      }).
      when('/index', {
        templateUrl: 'js/app/views/index.client.view.html',
        controller: 'IndexController'
      }).      
      otherwise({
        redirectTo: '/'
      });
  }
]);