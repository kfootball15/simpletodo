simpleToDoApp.component('todolistsComponent', {
	templateUrl: '/js/todolists/todolists.component.template.html',
	controller: function todolistsController($stateParams, userService, todolistService, PROD_URL) {
	    
	    this.$onInit = function () { //We can only use our bindings inside of our controllers $onInit  
	    	//Create Current URL(For display)
	    	this.prodUrl = PROD_URL;

	    	//Fetch Todolists
		    todolistService.getTodolists(this.currentUser._id)
		    .then((todolists)=>{
		    	this.todolists = todolists;
		    	this.todolistsReversed = this.todolists.reverse()
		    })
		    
	    }

	},
	bindings:{
		currentUser: '<' //Binds the currentUser to our component via the resolve method in app.js
	}
});