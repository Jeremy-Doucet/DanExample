namespace app.controllers {
	export class BlogCreateController {
		public blog;

		public create() {
			this.BlogService.create(this.blog as IBlog).then(() => {
				this.$state.go('main')
			});
		}


		constructor(
			private BlogService: app.services.BlogService,
			private $state: ng.ui.IStateService
		) {
			
		}
	}
	angular.module('app').controller('BlogCreateController', BlogCreateController);
}