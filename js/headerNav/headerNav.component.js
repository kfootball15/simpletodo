simpleToDoApp.component('headerNav', {
	templateUrl: '/js/headerNav/headerNav.template.html',
	controller: function headerNavController($state) {
		
		this.$onInit = function () {
			var currentState = $state.current.name;
			var currentUserName, currentTodolistTitle;
			if (this.currentUser) currentUserName = this.currentUser.username;
			if (this.currentTodolist) currentTodolistTitle = this.currentTodolist;
			var links = [
				{
					text: "Home",
					state: "home"
				},
				{
					text: currentUserName,
					state: "todolists",
					data: {
						username: currentUserName,
					}
				},
				{
					text: currentTodolistTitle,
					state: "todolist",
					data: {
						userId: currentUserName,
						todolistTitle: currentTodolistTitle
					}
				}
			];
			
			this.linksToShow = configureLinks()
			
			function configureLinks () {
				if (currentState === "home"){
					return links.slice(0,1);
				}
				else if (currentState === "todolists"){
					return links.slice(0,2);
				}
				else if (currentState === "todolist"){
					return links.slice(0,3);
				}
			}
		}

	},
	bindings: {
		currentUser:"<",
		currentTodolist:"<"
	}
});