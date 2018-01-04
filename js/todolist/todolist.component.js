simpleToDoApp.component('todolist', {
	templateUrl: '/js/todolist/todolist.template.html',
	controller: function todolistController($stateParams, todolistService, PROD_URL) {

		this.$onInit = function () { //We can only use our bindings inside of our controllers $onInit  
	    	
	    	this.currentUrl = PROD_URL + this.currentUser.username + '/';
	    	
	    	//Gets passed to the createTodoItem component
	    	this.todolistTitle = $stateParams.todolistTitle;
		   	
		   	todolistService.getTodolist(this.currentUser._id, $stateParams.todolistTitle)
		    .then((todolist)=>{
		    	console.log(todolist)
		    	this.todolist = todolist;
		    })   
	    }
	},
	bindings: {
		currentUser: '<' //Binds the currentUser to our component via the resolve method in app.js
	}
});