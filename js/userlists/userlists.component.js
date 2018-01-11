simpleToDoApp.component('userlists', {
	templateUrl: '/js/userlists/userlists.template.html',
	controller: function userlistsController($stateParams, userService, todolistService, PROD_URL) {
	    
	    this.$onInit = function () { //We can only use our bindings inside of our controllers $onInit  
	    	this.prodUrl = PROD_URL;
		    todolistService.getTodolists(this.currentUser._id)
		    .then((todolists)=>{
		    	this.todolists = todolists;
		    })
	    }

	    this.deleteTodolist = function (selectedTodolist) {
	    	todolistService.deleteTodolist(selectedTodolist)
	    	.then(() => {
	    		for (var i = this.todolists.length - 1; i >= 0; i--) {
	    		 	if(this.todolists[i]._id === selectedTodolist._id) {
	    		 		this.todolists.splice(i, 1);
	    		 		return;
	    		 	}
	    		 }
	    	})
	    	.catch(err => {
	    		console.log(err)
	    	})
	    }

	},
	bindings:{
		currentUser: '<' //Binds the currentUser to our component via the resolve method in app.js
	}
});