(function(){
	'use strict';

	var app = angular.module('app');

	app.service('serverConnection', function($http, model){
		this.getData = () => {
			$http
				.get('/post')
				.success((data) => {
					model.posts = data;
					console.log(model.posts);
				})
				.error(() => {
					console.log('error');
				});
		};

		this.sendData = (url, data, cb) => {
			$http.post(url, data).then(() => {
				this.getData();
				if (cb) cb();
			});
		};


	});


	app.service('modalService', function ($document) {
		var faden = document.querySelector('.faden');

		this.showModal = (selector) => {
			var modal = document.querySelector('.modals'+selector);

			modal.classList.remove('d-n');
			faden.classList.remove('d-n');

			setTimeout(() => {
				faden.classList.remove('o0');
			}, 1);
		};

		this.closeModal = (selector, cb) => {
			var modal = document.querySelector('.modals'+selector);
			faden.classList.add('o0');
			setTimeout(() => {
				faden.classList.add('d-n');
				modal.classList.add('d-n');
				if (cb) cb();
			}, 500);
		};
	});


	app.directive('ngEnter', function () {
		return function (scope, element, attrs) {
			element.bind("keydown keypress", function (event) {
				if(event.which === 13) {
					scope.$apply(function (){
						scope.$eval(attrs.ngEnter);
					});
					event.preventDefault();
				}
			});
		};
	});

})();