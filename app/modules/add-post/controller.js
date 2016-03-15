(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('AddPostController', function(model, serverConnection){
		var $ctrl = this;

		$ctrl.model = model;
		$ctrl.text = '';

		$ctrl.submit = function() {
			var data = {
				date: new Date().getTime(),
				postAuthor: model.userName,
				postText: $ctrl.text
			};

			serverConnection.sendData('/post', data, () => $ctrl.text = '');

		};

	});

})();