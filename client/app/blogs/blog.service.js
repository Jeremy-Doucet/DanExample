var app;
(function (app) {
    var services;
    (function (services) {
        var BlogService = (function () {
            function BlogService($resource) {
                this.BlogResource = $resource('/api/blogs/:id', null, {
                    'update': { 'method': 'PUT' }
                });
            }
            BlogService.prototype.getAll = function () {
                return this.BlogResource.query();
            };
            BlogService.prototype.create = function (b) {
                return this.BlogResource.save(b).$promise;
            };
            return BlogService;
        }());
        services.BlogService = BlogService;
        angular.module('app').service('BlogService', BlogService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
