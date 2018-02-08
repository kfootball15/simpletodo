simpleToDoApp.component('createTodolist', {
	templateUrl: '/js/createTodolist/createTodolist.template.html',
	controller: function createTodolistController(todolistService, $state) {

	    this.$onInit = function () {
		    this.todolist = {
		    	ownerId: this.user._id //Bindings are not assigned until after the $onInit hook https://medium.com/front-end-hacking/angularjs-component-binding-types-my-experiences-10f354d4660
		    }
	    }

	    this.createTodolist = (isValid) => {
	    	if(isValid){
		    	todolistService.createTodolist(this.todolist)
			    .then((todolist)=>{
			    	// You could also use this opportunity to update the currentUsers todolist with the new todolist, BUT since we are rerouting our user anyway there is no need
			    	$state.go('todolist', {userId: this.user.username, todolistTitle: todolist.title})
			    })
	    	}
	    }

	},
	bindings: {
		user: '<'
	}
});