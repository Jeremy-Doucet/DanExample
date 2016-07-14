namespace app.services {
	interface IBlogResourceClass extends IBlog, ng.resource.IResource<IBlogResourceClass> {}
	interface IBlogResource extends ng.resource.IResourceClass<IBlogResourceClass> {}

	export class BlogService {
		private BlogResource: IBlogResource;

		public getAll() {
			return this.BlogResource.query();
		}

		public create(b: IBlog) {
			return this.BlogResource.save(b).$promise;
		}

		constructor($resource: ng.resource.IResourceService) {
			this.BlogResource = <IBlogResource>$resource('/api/blogs/:id', null, { 
				'update': { 'method': 'PUT' }
			});
		}
	}
	angular.module('app').service('BlogService', BlogService);
}