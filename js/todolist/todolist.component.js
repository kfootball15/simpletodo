simpleToDoApp.component('todolist', {
	templateUrl: '/js/todolist/todolist.component.template.html',
	controller: function todolistController($stateParams, todolistService, PROD_URL) {

		this.$onInit = function () { //We can only use our bindings inside of our controllers $onInit  

			//Create Current URL(For display)
	    	this.currentUrl = PROD_URL + this.currentUser.username + '/';    	
	    	
	    	//Todolist title gets passed to the createTodoItem component
	    	this.todolistTitle = $stateParams.todolistTitle; 
		   	
		   	//Get the Todo Items for this list
		   	todolistService.getTodolist(this.currentUser._id, $stateParams.todolistTitle)
		    .then((todolist)=>{
		    	this.todolist = todolist;
		    	this.todolist.todosReversed = this.todolist.todos.reverse() //Reverse the order of the todolist so the most recent todo items appear at the top
		    })   
	    }

	    this.refreshList = function (item) {
	    	this.todolist.todos.unshift(item)
	    }

	},
	bindings: {
		currentUser: '<' //Binds the currentUser to our component via the resolve method in app.js
	}
});