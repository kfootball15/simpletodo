simpleToDoApp.service('todolistService', function($http){
	var service = {
		getTodolist (userId, listId) {
			return $http.get('/api/' + userId + '/' + listId)
			.then(function(response){
				return response.data;
			})
			.catch(function(err){
				console.log(err)
			})
		},
		getTodolists (userId) {
			return $http.get('/api/' + userId)
			.then(function(response){
				return response.data;
			})
			.catch(function(err){
				console.log(err);
			})
		}
	};
	return service;
})