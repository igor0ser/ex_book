(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('AddPostController', function(model, serverConnection){
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

			serverConnection.sendData('/post', data, () => vm.text = '');

		};

	});

})();