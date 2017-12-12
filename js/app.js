var simpleToDoApp = angular.module('simpleToDoApp', ['ui.router']);

simpleToDoApp.config(function($stateProvider){
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

})

// simpleToDoApp.run(function($uiRouter) {
//   var StateTree = window['ui-router-visualizer'].StateTree;
//   var el = StateTree.create($uiRouter, null, { height: 100, width: 300 });
//   el.className = 'statevis';
// });