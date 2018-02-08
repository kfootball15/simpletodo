simpleToDoApp.directive('todolists', function(todolistService){
	return {
		restrict: 'E',
		templateUrl: '/js/todolists/todolists.directive.template.html',
		scope:{
			username: "=",
			usertodolists: "=",
			deleteTodolist: "&"
		},
		link: function (scope, element, attrs) {
		    	console.log(scope.username, scope.usertodolists)
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
		}
	}
})