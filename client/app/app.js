var app;
(function (app) {
    angular.module('app', ['ui.router', 'ngResource'])
        .config(function ($locationProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    });
})(app || (app = {}));
