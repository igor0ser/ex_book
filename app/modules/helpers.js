(function(){
	'use strict';

	var app = angular.module('app');

	app.service('serverConnection', function($http, model){
		this.getData = () => {
			$http
				.get('/post')
				.success((data) => {
					model.posts = data;
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


	app.service('closeModal', function ($state) {
		var closeModal = (state, params) => {
			var faden = document.querySelector('.faden');
			faden.classList.add('o0');
			setTimeout(() => {
				faden.classList.remove('o0');
				$state.go(state, params);
			}, 300);

		};
		return closeModal;
	});

	app.service('socket', function($rootScope){
		var socket = io.connect('');

		this.on = function(eventName, callback) {
			socket.on(eventName, function () {
				var args = arguments;
				$rootScope.$apply(function () {
					callback.apply(socket, args);
				});
			});
		};

		this.emit  = function(eventName, data, callback) {
			socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function () {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			});
		};
	});

	app.service('modelChanger', function(model){
		this.addPost = function(post){
			model.posts.push(post);
		};
		this.addComment = function(comment){
			var post = model.posts.filter(post => post._id === comment.postId)[0];
			post.comments.push(comment);
		};
		this.removeComment = function(comment){
			var comments = model.posts.filter(post => post._id === comment.postId)[0].comments;
			var commentToDel = comments.filter(item => item.date === comment.date && item.commentAuthor === comment.commentAuthor )[0];
			var i = comments.indexOf(commentToDel);
			comments.splice(i, 1);
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