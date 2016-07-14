var app;
(function (app) {
    angular.module('app')
        .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
            url: '/',
            templateUrl: '/client/app/main/main.html',
            controller: 'MainController as vm'
        });
    });
})(app || (app = {}));
