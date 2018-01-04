simpleToDoApp.component('createTodolistItem', {
	templateUrl: '/js/createTodolistItem/createTodolistItem.template.html',
	controller: function createTodolistItemController(todolistService, PROD_URL) {

		this.$onInit = function () {
			this.todolistItem = {
				owner: this.currentTodolistId,
				user: this.currentUser
			}
			console.log("Initial todolistitem", this.todolistItem);
		}

		this.createTodolistItem = (todolistItem) => {
			todolistService.createTodolistItem(todolistItem)
			.then((todolistItem)=>{
				//Push this newly created item into our user array? Somehow communicate this to parent controller (todolistController) on the userlists page
			})
		}

	},
	bindings: {
		currentUser: '<',
		currentTodolistId: '<'
	}
});