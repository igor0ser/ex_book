(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('ModalController', function($scope, $http,  model, modalService){
		var vm = this;
		vm.login = '';
		vm.password = '';
		vm.passwordRepeat = '';

		vm.close = modalService.closeModal;

		vm.submit = function(url) {
			var data = {
				login: vm.login,
				password: vm.password
			};

			$http.post(url, data).then((data) => {
				console.log(data.data);
				if (data.data === 'Wrong login or password') {
					showMes(data.data);
				} else {
					showMes('You were succesfully authorized!', () => {
						model.userName = vm.login;
						model.avatar = data.data;
						model.isLogined = true;
						console.log(model);
					});
				}
			});
		};

		function showMes(mes, cb){
			document.querySelector('.message-text').innerHTML = mes;
			modalService.closeModal('.login', () => {
				modalService.showModal('.message');
				if (cb) cb();
				vm.login = '';
				vm.password = '';
			});
		}

	});

})();