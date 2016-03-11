(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('PostController', function($scope, $http, model, getPosts){
		var vm = this;

		var post = model.posts.filter(item => item.id == $scope.id)[0];
		vm.post = post;
		vm.model = model;
		vm.text = '';

		vm.submit = function() {
			console.log(vm.text);
			var data = {
				id: $scope.id,
				commentAuthor: model.userName,
				commentText: vm.text
			};

			$http.post('/comment', data).then(() => {
				getPosts.get();
				vm.text = '';
				console.log(model);
			});
		};
	});

})();
