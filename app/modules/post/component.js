(function(){
	'use strict';

	var app = angular.module('app');

	app.component('post', {
		templateUrl: '/modules/post/view.html',
		bindings: {
			postObj: '=',
			isLogined: '='
		}
	});

})();