simpleToDoApp.service('userService', function($http, $q){
	var currentUser;
	var service = {
		createUser (username) {
			return $http.post('/api/users/' + username)
			.then(function(response){
				return response.data;
			})
			.catch(err => { console.log(err) })
		},
		getUser (username) {
			if (!currentUser || username !== currentUser.username ){ //If we have no cached user or if the cached user differs from the requested user, go fetch/create from Backend
				return $http.get('/api/users/' + username)
				.then(function(response){
					currentUser = response.data;
					return response.data;
				})
				.catch(err => { console.log(err);})
			} else { //else just send cached user
				return $q(function(resolve, reject){
					resolve(currentUser);
				})
			}
		}
	};
	return service;
})