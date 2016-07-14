var app;
(function (app) {
    angular.module('app')
        .config(function ($stateProvider) {
        $stateProvider.state('blog create', {
            url: '/blog/create',
            templateUrl: '/client/app/blogs/create/blog.create.html',
            controller: 'BlogCreateController as vm'
        });
    });
})(app || (app = {}));
