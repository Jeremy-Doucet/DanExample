namespace app {
	angular.module('app', ['ui.router', 'ngResource'])
	.config((
		$locationProvider: ng.ILocationProvider,
		$urlRouterProvider: ng.ui.IUrlRouterProvider
	) => {
		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);
	});
}