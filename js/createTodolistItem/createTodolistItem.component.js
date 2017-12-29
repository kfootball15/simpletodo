simpleToDoApp.component('createTodolistItem', {
	templateUrl: '/js/createTodolistItem/createTodolistItem.template.html',
	controller: function createTodolistItemController(todolistService, PROD_URL) {

		this.$onInit = function () {
			console.log(this.currentTodolistId)
			this.todolistItem = {
				owner: this.currentTodolistId
			}
		}

		this.createTodolistItem = (todolistItem) => {
			console.log(todolistItem);
			todolistService.createTodolistItem(todolistItem)
			.then((todolistItem)=>{
				//Push this newly created item into our user array? Somehow communicate this to parten controller (todolistController) on the userlists page
			})
		}

	},
	bindings: {
		currentUser: '<',
		currentTodolistId: '<'
	}
});