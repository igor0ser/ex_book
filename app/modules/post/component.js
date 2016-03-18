(function(){
	'use strict';

	var app = angular.module('app');

	app.component('post', {
		controller: 'PostController',
		templateUrl: '/modules/post/view.html',
		bindings: {
			postObj: '=',
			isLogined: '='
		}
	});

})();