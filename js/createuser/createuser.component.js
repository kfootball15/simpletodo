simpleToDoApp.component('createUser', {
	templateUrl: '/js/createuser/createuser.template.html',
	controller: function createUserController(userService, $state) {
	    this.test = "Create User Component";
	    this.user = {
	    	username: ""
	    }
	    this.createUser = (user) => {
	    	console.log("angular:", user.username)
	    	userService.createUser(user.username)
		    .then((data)=>{
		    	console.log("data:", data.username);
		    	$state.go('userlists', {userId: data.username});
		    })
	    }
	}
});