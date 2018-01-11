simpleToDoApp.component('todolist', {
	templateUrl: '/js/todolist/todolist.template.html',
	controller: function todolistController($stateParams, todolistService, PROD_URL) {

		this.$onInit = function () { //We can only use our bindings inside of our controllers $onInit  
	    	this.currentUrl = PROD_URL + this.currentUser.username + '/';    	
	    	this.todolistTitle = $stateParams.todolistTitle; //Gets passed to the createTodoItem component
		   	
		   	todolistService.getTodolist(this.currentUser._id, $stateParams.todolistTitle)
		    .then((todolist)=>{
		    	this.todolist = todolist;
		    })   
	    }

	    this.refreshList = function (item) {
	    	this.todolist.todos.push(item)
	    }

	    this.deleteItem = function (selectedItem){
	    	todolistService.deleteTodolistItem(selectedItem)
	    	.then((success)=>{
	    		for (var i = this.todolist.todos.length - 1; i >= 0; i--) {
	    			if(this.todolist.todos[i]._id === selectedItem._id){
	    				this.todolist.todos.splice(i,1);
	    				return;
	    			}
	    		}
	    	})
	    	.catch((error)=>{console.log(error)})
	    }
	},
	bindings: {
		currentUser: '<' //Binds the currentUser to our component via the resolve method in app.js
	}
});