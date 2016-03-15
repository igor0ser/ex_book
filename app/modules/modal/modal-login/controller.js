(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('ModalLoginController', function($scope, $http, model, $state){
		var $ctrl = this;
		$ctrl.login = '';
		$ctrl.password = '';
		$ctrl.passwordRepeat = '';


		$ctrl.submit = function(url) {
			var data = {
				login: $ctrl.login,
				password: $ctrl.password
			};

			$http.post(url, data).then((data) => {
				console.log(data.data);
				if (data.data === 'Wrong login or password') {
					$state.go('modal.message', {mes: data.data});
				} else {
					model.userName = $ctrl.login;
					model.isLogined = true;
					$state.go('modal.message', {mes : 'You were succesfully authorized'});
				}
			});
		};


	});

})();