(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('ModalLoginController', function($http, model, closeModal){
		var $ctrl = this;
		$ctrl.login = '';
		$ctrl.password = '';

		$ctrl.submit = function() {
			var user = {
				login: $ctrl.login,
				password: $ctrl.password
			};

			$http.post('/login', user).then((data) => {
				console.log(data.data === 'OK');
				if (data.data === 'OK') {
					model.userName = $ctrl.login;
					model.isLogined = true;
					closeModal('modal.message', {mes : 'You were succesfully authorized'});
				} else {
					closeModal('modal.message', {mes: data.data});
				}
			});
		};
	});

})();