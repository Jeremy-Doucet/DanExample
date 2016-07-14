namespace app {
	angular.module('app')
	.config((
		$stateProvider: ng.ui.IStateProvider
	) => {
		$stateProvider.state('blog create', {
			url: '/blog/create',
			templateUrl: '/client/app/blogs/create/blog.create.html',
			controller: 'BlogCreateController as vm'
		});
	});
}