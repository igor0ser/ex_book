(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('AddCommentController', function($scope, model, serverConnection){
		var vm = this;

		vm.text = '';
		console.log($scope.id);

		vm.submit = function() {
			var data = {
				id: $scope.idpost,
				commentAuthor: model.userName,
				commentText: vm.text
			};

			serverConnection.sendData('/comment', data, () => vm.text = '');
		};
	});

})();
