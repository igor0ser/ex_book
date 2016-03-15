(function(){
	'use strict';

	var app = angular.module('app');

	app.component('addPost', {
		templateUrl: '/modules/add-post/view.html',
		controller: 'AddPostController'
	});

})();