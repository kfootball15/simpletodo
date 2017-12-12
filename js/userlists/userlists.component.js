simpleToDoApp.component('userlists', {
	templateUrl: '/js/userlists/userlists.template.html',
	controller: function todolistController($stateParams, todolistService) {
	    this.user = {
	    	name: $stateParams.userId
	    }

	    todolistService.getTodolists()
	    .then((data)=>{
	    	this.todolists = data;
	    })
	}
});