var app;
(function (app) {
    var services;
    (function (services) {
        var AuthService = (function () {
            function AuthService($http, $q, $window) {
                this.$http = $http;
                this.$q = $q;
                this.$window = $window;
                this.user = {
                    _id: null,
                    username: null
                };
                if (this.getToken())
                    this.setUser();
            }
            AuthService.prototype.login = function (u) {
                var _this = this;
                var q = this.$q.defer();
                this.$http.post('/api/auth/local/login', u).then(function (res) {
                    _this.setToken(res.data['token']);
                    _this.setUser();
                    q.resolve();
                }, function (err) {
                    q.reject();
                });
                return q.promise;
            };
            AuthService.prototype.register = function (u) {
                var _this = this;
                var q = this.$q.defer();
                this.$http.post('/api/auth/local/register', u).then(function (res) {
                    _this.setToken(res.data['token']);
                    _this.setUser();
                    q.resolve();
                }, function (err) {
                    q.reject();
                });
                return q.promise;
            };
            AuthService.prototype.logout = function () {
                this.user._id = null;
                this.user.username = null;
                this.$window.localStorage.removeItem('token');
            };
            AuthService.prototype.setToken = function (token) {
                this.$window.localStorage.setItem('token', token);
            };
            AuthService.prototype.getToken = function () {
                return this.$window.localStorage.getItem('token');
            };
            AuthService.prototype.setUser = function () {
                var u = JSON.parse(this.urlBase64Decode(this.getToken().split('.')[1]));
                this.user.username = u.username;
                this.user._id = u._id;
            };
            AuthService.prototype.urlBase64Decode = function (str) {
                var output = str.replace(/-/g, '+').replace(/_/g, '/');
                switch (output.length % 4) {
                    case 0: {
                        break;
                    }
                    case 2: {
                        output += '==';
                        break;
                    }
                    case 3: {
                        output += '=';
                        break;
                    }
                    default: {
                        throw 'Illegal base64url string!';
                    }
                }
                return decodeURIComponent(encodeURIComponent(this.$window.atob(output)));
            };
            return AuthService;
        }());
        services.AuthService = AuthService;
        angular.module('app').service('AuthService', AuthService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
