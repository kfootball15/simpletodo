simpleToDoApp.component('todolistComponent', {
	templateUrl: '/js/todolist/todolist.component.template.html',
	controller: function todolistController($stateParams, PROD_URL) {

		this.$onInit = function () { //We can only use our bindings inside of our controllers $onInit  

			//Create Current URL(For display)
	    	this.currentUrl = PROD_URL + this.currentUser.username + '/';    	
	    	
	    	//Todolist title gets passed to the createTodoItem component
	    	this.todolistTitle = $stateParams.todolistTitle; 
 
	    }

	    this.refreshList = function (item) {
	    	this.currentTodolist.unshift(item)
	    }

	},
	bindings: {
		currentUser: '<', //Binds the currentUser to our component via the resolve method in app.js
		currentTodolist: '<'
	}
});