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
		getTodolist (userId, listId) {
			return $http.get('/api/todolists/' + userId + '/' + listId)
			.then(function(todolist){
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