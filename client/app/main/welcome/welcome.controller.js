var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var WelcomeController = (function () {
            function WelcomeController(AuthService) {
                this.AuthService = AuthService;
                this.user = AuthService.user;
            }
            return WelcomeController;
        }());
        controllers.WelcomeController = WelcomeController;
        angular.module('app').controller('WelcomeController', WelcomeController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
