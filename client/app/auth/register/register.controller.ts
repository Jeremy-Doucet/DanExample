namespace app.controllers {
	export class RegisterController {
		public user: IUser;

		public register() {
			this.AuthService.register(this.user).then(() => {
				this.$state.go('welcome');
			}, () => {

			});
		}

		constructor(
			private AuthService: app.services.AuthService,
			private $state: ng.ui.IStateService
		) {

		}
	}
	angular.module('app').controller('RegisterController', RegisterController);
}
