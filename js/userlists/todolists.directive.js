simpleToDoApp.directive('todolists', function(todolistService){
	return {
		restrict: 'E',
		templateUrl: '/js/userlists/todolists.directive.template.html',
		scope:{
			userId: "=",
			usertodolists: "=",
			deleteTodolist: "&"
		},
		link: function (scope, element, attrs) {
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