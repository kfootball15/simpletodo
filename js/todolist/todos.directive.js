simpleToDoApp.directive('todos', function(todolistService){
	return{
		restrict:'E',
		templateUrl: '/js/todolist/todos.directive.template.html',
		scope: {
			todos:"="
		},
		link (scope, element, attrs) {
			scope.deleteItem = function (selectedItem){
		    	todolistService.deleteTodolistItem(selectedItem)
		    	.then((success)=>{
		    		for (var i = scope.todos.length - 1; i >= 0; i--) {
		    			if(scope.todos[i]._id === selectedItem._id){
		    				scope.todos.splice(i,1);
		    				return;
		    			}
		    		}
		    	})
		    	.catch((error)=>{console.log(error)})
		    }
		}
	}
})