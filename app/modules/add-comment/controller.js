(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('AddCommentController', function($scope, model, serverConnection){
		var vm = this;
		console.log($scope.postId);

		vm.text = '';

		vm.submit = function() {
			var data = {
				id: $scope.postId,
				commentAuthor: model.userName,
				commentText: vm.text,
				date: new Date().getTime()
			};

			serverConnection.sendData('/comment', data, () => vm.text = '');
		};
	});

})();
