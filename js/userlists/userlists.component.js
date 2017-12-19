simpleToDoApp.component('userlists', {
	templateUrl: '/js/userlists/userlists.template.html',
	controller: function userlistsController($stateParams, userService, todolistService) {
	    
	    this.$onInit = function () {
	    	console.log(this.currentUser.username) //We can only use our bindings inside of our controllers $onInit
	    }

	    // todolistService.getTodolists()
	    // .then((data)=>{
	    // 	this.todolists = data;
	    // })

	},
	bindings:{
		currentUser: '<' //Binds the currentUser to our component via the resolve method in app.js
	}
});