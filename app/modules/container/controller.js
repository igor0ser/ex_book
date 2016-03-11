(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('ContainerController', function(model, $http, getPosts){
		var vm = this;

		vm.model = model;
		vm.text = '';

		vm.submit = function() {
			var data = {
				id: new Date().getTime(),
				postAuthor: model.userName,
				postText: vm.text,
				postAvatar: model.avatar,
				comments: []
			};

			$http.post('/post', data).then(() => {
				getPosts.get();
				vm.text = '';
			});
		};

	});

})();