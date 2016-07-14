var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var BlogCreateController = (function () {
            function BlogCreateController(BlogService, $state) {
                this.BlogService = BlogService;
                this.$state = $state;
            }
            BlogCreateController.prototype.create = function () {
                var _this = this;
                this.BlogService.create(this.blog).then(function () {
                    _this.$state.go('main');
                });
            };
            return BlogCreateController;
        }());
        controllers.BlogCreateController = BlogCreateController;
        angular.module('app').controller('BlogCreateController', BlogCreateController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
