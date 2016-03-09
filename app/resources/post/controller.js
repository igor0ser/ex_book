(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('PostController', function($scope, model){
		var vm = this;

		var post = model.filter(item => item.id === $scope.id)[0];
		vm.post = post;
	});

})();
