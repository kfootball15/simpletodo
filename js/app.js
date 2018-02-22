var simpleToDoApp = angular.module('simpleToDoApp', ['ui.router', 'ngMessages']);

simpleToDoApp
.config(function($locationProvider, $stateProvider){
	// Application States
	$stateProvider
	.state('home', {
		// cache:false,
		url:'/',
		component: 'home'
	})
	.state('todolists', {
		// cache: false,
		url: '/:username',
		component: 'todolistsComponent',
		resolve: {
			currentUser ($stateParams, userService) {
				//Resolve for the username entered into our URL paramters
				return userService.getUser($stateParams.username)
				.then(user => {
					return user;
				})
				.catch(err => {console.log("No User with that name!", err);})
			},
			currentTodolists (todolistService, currentUser) {   	
				//Fetch Todolists
			    return todolistService.getTodolists(currentUser._id)
			    .then(todolists => {
			    	return todolists.reverse()
			    })
				.catch(err => {console.log(err);})
			}
		}
	})
	.state('todolist', {
		url: '/:userId/:todolistTitle',
		component: 'todolistComponent',
		resolve: {
			currentUser ($stateParams, userService) {
				//Resolve for the username entered into our URL paramters
				return userService.getUser($stateParams.userId)
				.then(user => {
					return user;
				})
				.catch(err => {console.log("No User with that name:", err);})
			},
			currentTodolist ($stateParams, todolistService, currentUser) {
				return todolistService.getTodolist(currentUser._id, $stateParams.todolistTitle)
			    .then(todolist => {
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
			currentUser ($stateParams, userService) {
				//Resolve for the username entered into our URL paramters
				return userService.getUser($stateParams.userId)
				.then( user => {
					return user;
				})
				.catch( err => {console.log(err);})
			},
			currentTodolist ($stateParams, todolistService, currentUser) {
				return todolistService.getTodolist(currentUser._id, $stateParams.todolistTitle)
			    .then(todolist => {
			    	return todolist.todos.reverse(); //Reverse the order of the todolist so the most recent todo items appear at the top
			    })  
				.catch(err => {console.log(err);})
			},
			newTodo ($state, $stateParams, todolistService, currentUser, currentTodolist) {
				todolistService.createTodo({
					owner: $stateParams.todolistTitle,
					title: $stateParams.todolistItemTitle,
					user: currentUser
				})
				.then(createdTodo => {
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