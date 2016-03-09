(function(){
	var app = angular.module('app', ['ui.router']);

	app.value('model', 
		[
			{
				id: '0',
				postAuthor: 'Korben Dallas',
				postText: 'Yipikaye motherfucker!',
				postAvatar: 'img/avatar1.jpg',
				comments: [
					{
						commentAuthor: 'User1',
						commentText: 'Lorem ipsum dolor sit amet.'
					},
					{
						commentAuthor: 'User2',
						commentText: 'blablabla'
					}
				]
			},
			{
				id: '1',
				postAuthor: 'Raccoon Earl',
				postText: 'Privet vsem!',
				postAvatar: 'img/avatar2.jpg',
				comments: [
					{
						commentAuthor: 'Corban Dallas',
						commentText: 'lol'
					},
					{
						commentAuthor: 'Raccoon Earl',
						commentText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, repudiandae, sed.'
					}
				]
			},
		]
	);

	app.value('user', {
		login: 'Igor',
		avatar: 'img/avatar3.jpg'
	});


})();