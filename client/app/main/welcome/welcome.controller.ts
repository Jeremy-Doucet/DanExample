namespace app.controllers {
  export class WelcomeController {
    public user;

    constructor(private AuthService: app.services.AuthService) {
      this.user = AuthService.user;
    }
  }

  angular.module('app').controller('WelcomeController', WelcomeController);
}
