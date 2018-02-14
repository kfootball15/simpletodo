simpleToDoApp.directive('todos', function(todolistService){
	return{
		restrict:'E',
		templateUrl: '/js/todolist/todos.directive.template.html',
		scope: {
			todos:"="
		},
		link (scope, element, attrs) {
		    
		    var tempTitleModel;
		    var tempDescriptionModel;

			scope.deleteItem = function (selectedTodo){
		    	todolistService.deleteTodolistItem(selectedTodo)
		    	.then((success)=>{
		    		for (var i = scope.todos.length - 1; i >= 0; i--) {
		    			if(scope.todos[i]._id === selectedTodo._id){
		    				scope.todos.splice(i,1);
		    				return;
		    			}
		    		}
		    	})
		    	.catch((error)=>{console.log(error)})
		    }
		    scope.toggleCompleted = function (selectedTodo) {
		    	todolistService.updateTodo(selectedTodo)
		    	.then((updatedTodo)=> {
		    		// If we need to add some sorting animation functionality here...
		    	})
			    .catch(err=>{console.error(err)})
		    }
		    scope.editTodo = function (isValid, selectedTodo) {
		    	if (isValid) {
		    		todolistService.updateTodo(selectedTodo)
		    		.then((updatedTodo) => {
		    			scope.editMode(selectedTodo)
		    		})
		    	}
		    }
		    scope.editMode = function (selectedTodo, resetModel) {
		    	//If we are entering editMode, store the current title/description in case the user changes the title/description and then hits cancel and the model needs to reset
		    	if (!selectedTodo.editMode){ 
		    		tempTitleModel = selectedTodo.title;
		    		tempDescriptionModel = selectedTodo.description
		    	}
		    	//Swap Edit Mode
		    	selectedTodo.editMode = !selectedTodo.editMode;

		    	//If we are entering Edit Mode, we pass a string that notes which property we need to reset to the values we stored above
		    	if (resetModel){
		    		selectedTodo.title = tempTitleModel;
		    		selectedTodo.description = tempDescriptionModel;
		    	}
		    }
		}
	}
})