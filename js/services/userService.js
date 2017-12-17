simpleToDoApp.service('userService', function($http){
	var service = {
		createUser (username) {
			console.log("createUser", username)
			return $http.post('/api/users/' + username)
			.then(function(response){
				console.log("service response data:", response.data)
				return response.data;
			})
			.catch(function(err){
				console.log(err)
			})
		},
		getUser (userId) {
			return $http.get('/api/users/' + userId)
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