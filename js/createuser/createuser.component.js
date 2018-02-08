simpleToDoApp.component('createUser', {
	templateUrl: '/js/createuser/createuser.template.html',
	controller: function createUserController(userService, $state) {
	    this.user = {
	    	username: ""
	    }
	    this.createUser = (isValid) => {
	    	if(isValid){
		    	userService.createUser(this.user.username)
			    .then((fetchedUser)=>{
			    	$state.go('todolists', {username: fetchedUser.username});
			    })
	    	}
	    }
	}
});