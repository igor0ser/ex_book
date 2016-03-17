(function(){
	'use strict';

	var app = angular.module('app');

	var vm = function(){};

	app.component('comment', {
		controller: 'CommentController',
		templateUrl: '/modules/comment/view.html',
		bindings: {
			author: '@',
			text: '@',
			date: '@',
			postId: '@'
		}
	});

})();