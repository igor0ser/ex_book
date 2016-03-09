(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('ContainerController', function($scope, model, user){
		var vm = this;

		vm.posts = model;
		vm.isLogined = !!user;
		$scope.user = user;


	});

})();
