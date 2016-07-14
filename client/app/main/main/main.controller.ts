namespace app.controllers {
	export class MainController {
		public blogs: IBlog[];

		constructor(
			private BlogService: app.services.BlogService
		) {
			this.blogs = BlogService.getAll();
		}
	}
	angular.module('app').controller('MainController', MainController);
}
