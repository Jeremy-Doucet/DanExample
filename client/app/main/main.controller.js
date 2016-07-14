var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var MainController = (function () {
            function MainController(BlogService) {
                this.BlogService = BlogService;
                this.blogs = BlogService.getAll();
            }
            return MainController;
        }());
        controllers.MainController = MainController;
        angular.module('app').controller('MainController', MainController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
