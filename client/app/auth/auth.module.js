var app;
(function (app) {
    angular.module('app')
        .config(function ($stateProvider) {
        $stateProvider.state('register', {
            url: '/register',
            templateUrl: '/client/app/auth/register/register.html',
            controller: 'RegisterController as vm'
        });
    });
})(app || (app = {}));
