(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('ContainerController', function(model, $http){
		var vm = this;

		vm.model = model;
		vm.text = '';

		vm.submit = function() {
			var data = {
				login: model.userName,
				postText: vm.text,
				postAuthor: model.avatar,
				id: new Date().getTime()
			};

			$http.post('post', data).then(() => {
			});
		};

	});

})();