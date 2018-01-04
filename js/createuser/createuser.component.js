simpleToDoApp.component('createUser', {
	templateUrl: '/js/createuser/createuser.template.html',
	controller: function createUserController(userService, $state) {
	    this.test = "Create User Component";
	    this.user = {
	    	username: ""
	    }
	    this.createUser = (user) => {
	    	userService.createUser(user.username)
		    .then((fetchedUser)=>{
		    	$state.go('userlists', {username: fetchedUser.username});
		    })
	    }
	}
});