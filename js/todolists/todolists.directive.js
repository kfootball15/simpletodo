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
		    
		    var tempModel;

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
		    	.catch(err => {console.error(err)})
		    }

		    scope.toggleCompleted = function (selectedTodolist) {
		    	todolistService.updateTodolist(selectedTodolist)
		    	.then((updatedTodolist)=> {
		    		// If we need to add some sorting animation functionality here...
		    	})
			    .catch(err=>{console.error(err)})
		    }

		    scope.editTodolistTitle = function (isValid, selectedTodolist) {
		    	if(isValid){
			    	todolistService.updateTodolist(selectedTodolist)
			    	.then((updatedTodolist)=> {
			    		// for(var i = 0; i < scope.usertodolists.length - 1; i++){
			    		// 	if (scope.usertodolists[i]._id === updatedTodolist._id){
			    		// 		scope.usertodolists[i].title=updatedTodolist.title
			    		// 		break;
			    		// 	}
			    		// }
			    		scope.editMode(selectedTodolist)
			    	})
			    	.catch(err=>{console.error(err)})
		    	}

		    }

		    scope.editMode = function (selectedTodoList, resetModel){
		    	if(!selectedTodoList.editMode) tempModel = selectedTodoList.title; //If we are entering editMode, store the current title in case the user changes the title and hits cancel and the model needs to reset
		    	selectedTodoList.editMode = !selectedTodoList.editMode
		    	if (resetModel) selectedTodoList.title = tempModel; //Hitting cancel will pass in a true paramter that will reset to the title to the title we stored above
		    }
		}
	}
})