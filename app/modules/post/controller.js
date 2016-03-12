(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('PostController', function($scope, model){
		var vm = this;

		console.log($scope.id);

		vm.post = model.posts.filter(item => item.id == $scope.id)[0];
		vm.model = model;

	});

})();
