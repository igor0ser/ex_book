(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('ModalLoginController', function($scope, $http, model, $state){
		var vm = this;
		vm.login = '';
		vm.password = '';
		vm.passwordRepeat = '';


		vm.submit = function(url) {
			var data = {
				login: vm.login,
				password: vm.password
			};

			$http.post(url, data).then((data) => {
				console.log(data.data);
				if (data.data === 'Wrong login or password') {
					$state.go('modal.message', {mes: data.data});
				} else {
					model.userName = vm.login;
					model.isLogined = true;
					$state.go('modal.message', {mes : 'You were succesfully authorized'});
				}
			});
		};


	});

})();