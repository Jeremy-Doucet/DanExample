namespace app {
	angular.module('app')
	.config((
		$stateProvider: ng.ui.IStateProvider
	) => {
		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: '/client/app/main/main/main.html',
				controller: 'MainController as vm'
			})
			.state('welcome', {
				url: '/welcome',
				templateUrl: '/client/app/main/welcome/welcome.html',
				controller: 'WelcomeController as vm'
			});
	});
}
