simpleToDoApp.service('todolistService', function($http){
	var service = {
		createTodolist (todolist) {
			return $http.post('/api/todolists/' + todolist.title + '/' + todolist.ownerId)
			.then(function(createdTodoList){
				return createdTodoList.data
			})
			.catch(function(err){
				console.log("ERROR:", err)
			})
		},
		createTodolistItem (todolistItem) {
			// return $http.post('/api/todos/')
			return $http({
	            method: 'POST',
	            url: '/api/todos/' + todolistItem.userId,
	            data: todolistItem
	        }).then(function(response){
	            return response;
	        })
		},
		getTodolist (userId, listId) {
			return $http.get('/api/todolists/' + userId + '/' + listId)
			.then(function(todolist){
				console.log(todolist.data)
				return todolist.data;
			})
			.catch(function(err){
				console.log(err)
			})
		},
		getTodolists (userId) {
			return $http.get('/api/todolists/' + userId)
			.then(function(populatedUser){
				return populatedUser.data;
			})
			.catch(function(err){
				console.log(err);
			})
		}
	};
	return service;
})