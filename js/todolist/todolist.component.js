simpleToDoApp.component('todolist', {
	templateUrl: '/js/todolist/todolist.template.html',
	controller: function todolistController($stateParams, todolistService, PROD_URL) {

		this.$onInit = function () { //We can only use our bindings inside of our controllers $onInit  
	    	
	    	this.currentUrl = PROD_URL + this.currentUser.username + '/';
	    	this.todolistId = $stateParams.todolistId
		   	
		   	console.log("CurrentUser Todolists", this.currentUser)
		   	todolistService.getTodolist(this.currentUser.userId, $stateParams.todolistId)
		    .then((data)=>{
		    	this.todolist = data;
		    })
		    
	    }

	},
	bindings: {
		currentUser: '<' //Binds the currentUser to our component via the resolve method in app.js
	}
});