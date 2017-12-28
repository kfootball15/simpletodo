simpleToDoApp.component('userlists', {
	templateUrl: '/js/userlists/userlists.template.html',
	controller: function userlistsController($stateParams, userService, todolistService, PROD_URL) {
	    
	    this.$onInit = function () { //We can only use our bindings inside of our controllers $onInit  
	    	this.prodUrl = PROD_URL;
		    todolistService.getTodolists(this.currentUser._id)
		    .then((populatedUser)=>{
		    	this.todolists = populatedUser.todolists;
		    })
	    }

	},
	bindings:{
		currentUser: '<' //Binds the currentUser to our component via the resolve method in app.js
	}
});