var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var LoginController = (function () {
            function LoginController(AuthService, $state) {
                this.AuthService = AuthService;
                this.$state = $state;
            }
            LoginController.prototype.login = function () {
                var _this = this;
                this.AuthService.login(this.user).then(function () {
                    _this.$state.go('welcome');
                });
            };
            return LoginController;
        }());
        controllers.LoginController = LoginController;
        angular.module('app').controller('LoginController', LoginController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
