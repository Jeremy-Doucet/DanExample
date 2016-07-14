namespace app.services {
	export class AuthService {

		public user = {
			_id: null,
			username: null
		}

		public login(u: IUser) {
			let q = this.$q.defer();
			this.$http.post('/api/auth/local/login', u).then((res) => {
				this.setToken(res.data['token']);
				this.setUser();
				q.resolve();
			}, (err) => {
				q.reject();
			});
			return q.promise;
		}

		public register(u: IUser) {
			let q = this.$q.defer();
			this.$http.post('/api/auth/local/register', u).then((res) => {
				this.setToken(res.data['token']);
				this.setUser();
				q.resolve();
			}, (err) => {
				q.reject();
			});
			return q.promise;
		}

		public logout() {
			this.user._id = null;
			this.user.username = null;
			this.$window.localStorage.removeItem('token');
		}

		public setToken(token: string) {
			this.$window.localStorage.setItem('token', token);
		}

		public getToken() {
			return this.$window.localStorage.getItem('token');
		}

		public setUser() {
			let u = JSON.parse( this.urlBase64Decode( this.getToken().split('.')[1] ) );
			this.user.username = u.username;
			this.user._id = u._id;
		}

		private urlBase64Decode(str) {
			let output = str.replace(/-/g, '+').replace(/_/g, '/');
			switch (output.length % 4) {
				case 0: { break; }
				case 2: { output += '=='; break; }
				case 3: { output += '='; break; }
				default: {
					throw 'Illegal base64url string!';
				}
			}
			return decodeURIComponent(encodeURIComponent(this.$window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
		}

		constructor(
			private $http: ng.IHttpService,
			private $q: ng.IQService,
			private $window: ng.IWindowService
		) {
			if (this.getToken()) this.setUser();
		}
	}
	angular.module('app').service('AuthService', AuthService);
}
