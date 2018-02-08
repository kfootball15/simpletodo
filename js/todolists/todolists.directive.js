simpleToDoApp.directive('todolists', function(todolistService){
	return {
		restrict: 'E',
		templateUrl: '/js/todolists/todolists.directive.template.html',
		scope:{
			username: "=",
			usertodolists: "=",
			deleteTodolist: "&"
		},
		link (scope, element, attrs) {
		    scope.deleteTodolist = function (selectedTodolist) {
		    	todolistService.deleteTodolist(selectedTodolist)
		    	.then(() => {
		    		for (var i = scope.usertodolists.length - 1; i >= 0; i--) {
		    		 	if(scope.usertodolists[i]._id === selectedTodolist._id) {
		    		 		scope.usertodolists.splice(i, 1);
		    		 		return;
		    		 	}
		    		 }
		    	})
		    	.catch(err => {
		    		console.log(err)
		    	})
		    }
		    scope.updateTodolist = function (isValid, selectedTodolist) {
		    	
		    	if(isValid){
			    	todolistService.updateTodolist(selectedTodolist)
			    	.then((updatedTodolist)=> {
			    		console.log(updatedTodolist)
			    		for(var i = 0; i < scope.usertodolists.length - 1; i++){
			    			console.log(scope.usertodolists[i]._id, updatedTodolist._id)
			    			if (scope.usertodolists[i]._id === updatedTodolist._id){
			    				scope.usertodolists[i].title=updatedTodolist.title
			    				break;
			    			}
			    		}
			    		scope.editMode(selectedTodolist)
			    	})
		    	}

		    }
		    scope.editMode = function (todolist){
		    	todolist.editMode = !todolist.editMode
		    }
		}
	}
})