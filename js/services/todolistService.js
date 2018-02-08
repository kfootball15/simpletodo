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
		createTodo (todolistItem) {
			return $http({
	            method: 'POST',
	            url: '/api/todos/' + todolistItem.owner +'/'+ todolistItem.user._id,
	            data: todolistItem
	        })
	        .then(function(newTodolistItem){
	            return newTodolistItem.data;
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
				return populatedUser.data.todolists;
			})
			.catch(function(err){
				console.log(err);
			})
		},
		deleteTodolist(selectedTodolist){
			return $http.delete('/api/todolists/' + selectedTodolist._id)
		},
		deleteTodolistItem(selectedItem){
			return $http.delete('/api/todos/' + selectedItem._id)
		},
		updateTodolist(selectedTodolist){
			console.log(selectedTodolist)
			return $http({
				method: 'PUT',
				url: '/api/todolists/' + selectedTodolist._id,
				data: selectedTodolist
			})
			.then((updatedTodolist)=>{
				return updatedTodolist.data
			})
		}
	};
	return service;
})