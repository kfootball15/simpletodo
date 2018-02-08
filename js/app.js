var simpleToDoApp = angular.module('simpleToDoApp', ['ui.router']);

simpleToDoApp
.config(function($locationProvider, $stateProvider){
	// Application States
	$stateProvider
	.state('home', {
		cache:false,
		url:'/',
		component: 'home'
	})
	.state('todolists', {
		cache: false,
		url: '/:username',
		component: 'todolistsComponent',
		resolve: {
			currentUser: function ($stateParams, userService) {
				//Resolve for the username entered into our URL paramters
				return userService.getUser($stateParams.username)
				.then(function(user){
					return user
				})
				.catch(function(err){
					console.log("No User with that name!", err)
				})
			}
		}
	})
	.state('todolist', {
		url: '/:userId/:todolistTitle',
		component: 'todolist',
		resolve: {
			currentUser: function ($stateParams, userService) {
				//Resolve for the username entered into our URL paramters
				return userService.getUser($stateParams.userId)
				.then(function(user){
					return user
				})
				.catch(function(err){
					console.log("No User with that name:", err)
				})
			}
		}
	})
	// .state('todolistItem', {
	// 	url: '/:userId/:todolistId/:todolistItemId',
	// 	component: 'todolistItem'
	// })

	// This, along with <base href="/"> in our index.html, removes the angular !# url prefix
	$locationProvider.html5Mode(true);
})
.constant('PROD_URL', 'www.s2do.me/')