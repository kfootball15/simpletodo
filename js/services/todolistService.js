simpleToDoApp.service('todolistService', function($http){
	var service = {
		createTodolist (todolist) {
			return $http.post('/api/todolists/' + todolist.title + '/' + todolist.ownerId)
			.then(function(fetchedTodolist){
				return fetchedTodolist.data
			})
			.catch(function(err){
				console.log("ERROR:", err)
			})
		},
		createTodolistItem (todolistItem) {
			return $http({
	            method: 'POST',
	            url: '/api/todos/' + todolistItem.owner +'/'+ todolistItem.user._id,
	            data: todolistItem
	        }).then(function(response){
	        	console.log("response", response)
	            return response;
	        })
		},
		getTodolist (userId, listTitle) {
			return $http.get('/api/todolists/' + userId + '/' + listTitle)
			.then(function(todolist){
				return todolist.data[0];
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