var simpleToDoApp = angular.module('simpleToDoApp', ['ui.router', 'ngMessages']);

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
					return user;
				})
				.catch(function(err){
					console.log("No User with that name!", err);
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
					return user;
				})
				.catch(err => {console.log("No User with that name:", err);})
			},
			currentTodolist: function ($stateParams, todolistService, currentUser) {
				return todolistService.getTodolist(currentUser._id, $stateParams.todolistTitle)
			    .then((todolist)=>{
			    	return todolist.todos.reverse(); //Reverse the order of the todolist so the most recent todo items appear at the top
			    })  
				.catch(err => {console.log(err);})
			}
		}
	})
	.state('todolistItem', {
		url: '/:userId/:todolistTitle/:todolistItemTitle',
		component: 'todolist',
		resolve: {
			currentUser: function ($stateParams, userService) {
				//Resolve for the username entered into our URL paramters
				return userService.getUser($stateParams.userId)
				.then(function(user){
					return user;
				})
				.catch(err => {console.log(err);})
			},
			currentTodolist: function ($stateParams, todolistService, currentUser) {
				return todolistService.getTodolist(currentUser._id, $stateParams.todolistTitle)
			    .then((todolist)=>{
			    	return todolist.todos.reverse(); //Reverse the order of the todolist so the most recent todo items appear at the top
			    })  
				.catch(err => {console.log(err);})
			},
			newTodo: function ($state, $stateParams, todolistService, currentUser, currentTodolist) {
				todolistService.createTodo({
					owner: $stateParams.todolistTitle,
					title: $stateParams.todolistItemTitle,
					user: currentUser
				})
				.then((createdTodo)=>{
					//After we create the todo, we route back to the correct todolist
					$state.go('todolist', {userId: currentUser.username, todolistTitle: $stateParams.todolistTitle })
				})
				.catch(err => {console.log(err);})
			}
		}
	})

	// This, along with <base href="/"> in our index.html, removes the angular !# url prefix
	$locationProvider.html5Mode(true);
})
.constant('PROD_URL', 'www.s2do.me/')