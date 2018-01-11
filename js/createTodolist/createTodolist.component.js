simpleToDoApp.component('createTodolist', {
	templateUrl: '/js/createTodolist/createTodolist.template.html',
	controller: function createTodolistController(todolistService, $state) {

		//We inherit the parent scopes "User" property using bindings below and in the HTML

	    this.$onInit = function () {
		    this.todolist = {
		    	ownerId: this.user._id //Bindings are not assigned until after the $onInit hook https://medium.com/front-end-hacking/angularjs-component-binding-types-my-experiences-10f354d4660
		    }
	    }


	    //WE SHOULD MOVE THIS OUT OF THE COMPONENT AND INTO A SERVICE
	    	//why? A controller is supposed to simply be a middleman, its job is to talk to the service to get the model and then make thismodel is available at the presentation layer (The HTML)
	    	/* We should abstract methods like these away to services so that:
				They are Reusable
				They are Testable
			*/
	    this.createTodolist = (todolist) => {
	    	todolistService.createTodolist(todolist)
		    .then((todolist)=>{
		    	// You could also use this opportunity to update the currentUsers todolist with the new todolist, BUT since we are rerouting our user anyway there is no need
		    	$state.go('todolist', {userId: this.user.username, todolistTitle: todolist.title})
		    })
	    }
	},
	bindings: {
		user: '<'
	}
});