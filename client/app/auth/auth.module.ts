namespace app {
	angular.module('app')
	.config((
		$stateProvider: ng.ui.IStateProvider
	) => {
		$stateProvider.state('register', {
			url: '/register',
			templateUrl: '/client/app/auth/register/register.html',
			controller: 'RegisterController as vm'
		})
		.state('login', {
			url: '/login',
			templateUrl: '/client/app/auth/login/login.html',
			controller: 'LoginController as vm'
		});

	});
}
