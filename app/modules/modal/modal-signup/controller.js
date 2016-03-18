(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('ModalSignupController', function($http, model, closeModal){
		var $ctrl = this;
		$ctrl.login = '';
		$ctrl.password = '';
		$ctrl.passwordRepeat = '';

		$ctrl.submit = function(url) {
			var user = {
				login: $ctrl.login,
				password: $ctrl.password
			};

			$http.post('/signup', user).then((data) => {
				console.log(data.data === 'OK');
				if (data.data === 'OK') {
					model.userName = $ctrl.login;
					model.isLogined = true;
					closeModal('modal.message', {mes : 'Your user was succesfully created!'});
				} else {
					closeModal('modal.message', {mes: data.data});
				}
			});
		};


	});

})();