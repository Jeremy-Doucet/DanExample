var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var RegisterController = (function () {
            function RegisterController(AuthService, $state) {
                this.AuthService = AuthService;
                this.$state = $state;
            }
            RegisterController.prototype.register = function () {
                var _this = this;
                this.AuthService.register(this.user).then(function () {
                    _this.$state.go('welcome');
                }, function () {
                });
            };
            return RegisterController;
        }());
        controllers.RegisterController = RegisterController;
        angular.module('app').controller('RegisterController', RegisterController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
