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
	.state('userlists', {
		cache: false,
		url: '/:userId',
		component: 'userlists',
		resolve: {
			currentUser: function ($stateParams, userService) {
				//Resolve for the username entered into our URL paramters
				return userService.getUser($stateParams.userId)
				.then(function(user){
					return user
				})
				.catch(function(err){
					console.log("Heres where we fight!", err)
				})
			}
		}
	})
	.state('todolist', {
		url: '/:userId/:todolistId',
		component: 'todolist'
		// resolve: {
	 //      loggedInUser: function (AuthService){
	 //        return AuthService.getLoggedInUser()
	 //      },
	 //      allUsers: function(UserFactory) {
	 //        return UserFactory.getAllUsers();
	 //      }
	 //    }
	})
	.state('todolistItem', {
		url: '/:userId/:todolistId/:todolistItemId',
		component: 'todolistItem'
		// resolve: {
	 //      loggedInUser: function (AuthService){
	 //        return AuthService.getLoggedInUser()
	 //      },
	 //      allUsers: function(UserFactory) {
	 //        return UserFactory.getAllUsers();
	 //      }
	 //    }
	})

	// This, along with <base href="/"> in our index.html, removes the angular !# url prefix
	$locationProvider.html5Mode(true);
})
.constant('PROD_URL', 'www.s2do.me/')