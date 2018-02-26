var simpleToDoApp = angular.module('simpleToDoApp', ['ui.router', 'ngMessages']);

simpleToDoApp
.run(($rootScope)=>{
	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){ 
        // this is required if you want to prevent the $UrlRouter reverting the URL to the previous valid location
        console.log("ERRPOJSPODSJ")
        event.preventDefault();
	})
})
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
			currentUser ($stateParams, $state, userService, $q) {
				var deferred = $q.defer();
				//Resolve for the username entered into our URL paramters
				return userService.getUser($stateParams.username)
				.then(user => {
					return user;
				})
				.catch(err => {
					$state.go('errorPage', {errorMessage: err})
				})

			},
			currentTodolists (todolistService, currentUser) {   	
				//Fetch Todolists
				if(currentUser){
				    return todolistService.getTodolists(currentUser._id)
				    .then(todolists => {
				    	return todolists.reverse()
				    })
					.catch(err => {console.log(err);})
				}
			}
		}
	})
	.state('todolist', {
		url: '/:userId/:todolistTitle',
		component: 'todolistComponent',
		resolve: {
			currentUser ($stateParams, $state, userService) {
				//Resolve for the username entered into our URL paramters
				return userService.getUser($stateParams.userId)
				.then(user => {
					return user;
				})
				.catch(err => {
					$state.go('errorPage', {errorMessage: err})
				})
			},
			currentTodolist ($stateParams, $state, todolistService, currentUser) {
				return todolistService.getTodolist(currentUser._id, $stateParams.todolistTitle)
			    .then(todolist => {
			    	return todolist.todos.reverse(); //Reverse the order of the todolist so the most recent todo items appear at the top
			    })  
				.catch(err => {
					$state.go('errorPage', {errorMessage: err})
				})
			}
		}
	})
	.state('todolistItem', {
		url: '/:userId/:todolistTitle/:todolistItemTitle',
		resolve: {
			currentUser ($stateParams, $state, userService) {
				//Resolve for the username entered into our URL paramters
				return userService.getUser($stateParams.userId)
				.then( user => {
					return user;
				})
				.catch(err => {
					$state.go('errorPage', {errorMessage: err})
				})
			},
			currentTodolist ($stateParams, $state, todolistService, currentUser) {
				if(currentUser){
					return todolistService.getTodolist(currentUser._id, $stateParams.todolistTitle)
				    .then(todolist => {
				    	return todolist.todos.reverse(); //Reverse the order of the todolist so the most recent todo items appear at the top
				    })  
					.catch(err => {
						$state.go('errorPage', {errorMessage: err})
					})
				}
			},
			newTodo ($state, $stateParams, todolistService, currentUser, currentTodolist) {
				if(currentUser && currentTodolist){
					todolistService.createTodo({
						owner: $stateParams.todolistTitle,
						title: $stateParams.todolistItemTitle,
						user: currentUser
					})
					.then(createdTodo => {
						//After we create the todo, we route back to the correct todolist
						$state.go('todolist', {userId: currentUser.username, todolistTitle: $stateParams.todolistTitle })
					})
					.catch(err => {
						$state.go('errorPage', {errorMessage: err})
					})
				}
			}
		}
	})
	.state('errorPage', {
		url: '/errorPage',
		component: 'errorPageComponent',
		params: {
			errorMessage: null
		}
	})

	// This, along with <base href="/"> in our index.html, removes the angular !# url prefix
	$locationProvider.html5Mode(true);
})
.constant('PROD_URL', 'www.s2do.me/')