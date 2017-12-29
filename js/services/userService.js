simpleToDoApp.service('userService', function($http, $q){
	var currentUser;
	var service = {
		createUser (username) {
			return $http.post('/api/users/' + username)
			.then(function(response){
				return response.data;
			})
			.catch(function(err){
				console.log(err)
			})
		},
		getUser (userId) {
			if (!currentUser){ //If we have no cached user, go fetch from Backend
				return $http.get('/api/users/' + userId)
				.then(function(response){
					currentUser = response.data;
					return response.data;
				})
				.catch(function(err){
					console.log(err);
				})
			} else { //else just send cached user
				console.log("returning Cached user");
				return $q(function(resolve, reject){
					resolve(currentUser);
				})
			}
		}
	};
	return service;
})