simpleToDoApp.component('todolist', {
	templateUrl: '/js/todolist/todolist.template.html',
	controller: function todolistController($stateParams, todolistService) {

		this.user = {
			name: $stateParams.userId,
		}
		this.todolistTitle = $stateParams.todolistId

	    todolistService.getTodolist($stateParams.userId, $stateParams.todolistId)
	    .then((data)=>{
	    	this.todolist = data;
	    })
	}
});