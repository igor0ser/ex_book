(function(){
	'use strict';

	var app = angular.module('app');

	app.controller('ModalLoadController', function(model){
		var $ctrl = this;
		$ctrl.userName = model.userName;
		console.log($ctrl);
	});

})();