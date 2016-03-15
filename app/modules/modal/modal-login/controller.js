(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('ModalLoginController', function($http, model, closeModal){
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
					closeModal('modal.message', {mes: data.data});
				} else {
					model.userName = $ctrl.login;
					model.isLogined = true;
					closeModal('modal.message', {mes : 'You were succesfully authorized'});
				}
			});
		};


	});

})();