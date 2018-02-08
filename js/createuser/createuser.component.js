simpleToDoApp.component('createUser', {
	templateUrl: '/js/createuser/createuser.template.html',
	controller: function createUserController(userService, $state) {
	    this.user = {
	    	username: ""
	    }
	    this.createUser = (user) => {
	    	userService.createUser(user.username)
		    .then((fetchedUser)=>{
		    	$state.go('todolists', {username: fetchedUser.username});
		    })
	    }
	}
});