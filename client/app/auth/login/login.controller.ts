namespace app.controllers {
  export class LoginController {
    public user: IUser;

    public login() {
      this.AuthService.login(this.user).then(() => {
        this.$state.go('welcome');
      });
    }

    constructor(
      private AuthService: app.services.AuthService,
      private $state: ng.ui.IStateService
    ) {

    }
  }

  angular.module('app').controller('LoginController', LoginController);
}
