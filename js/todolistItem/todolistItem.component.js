simpleToDoApp.component('todolistItem', {
	templateUrl: '/js/todolistItem/todolistItem.template.html',
	controller: function todolistItemController($stateParams) {
	    this.title = $stateParams.todolistItemId;
	    this.user = {
	    	name: $stateParams.userId
	    }
	    this.todolist = {
	    	title: $stateParams.todolistId
	    }
	}
});