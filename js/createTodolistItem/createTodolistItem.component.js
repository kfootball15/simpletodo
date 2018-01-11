simpleToDoApp.component('createTodolistItem', {
	templateUrl: '/js/createTodolistItem/createTodolistItem.template.html',
	controller: function createTodolistItemController(todolistService, PROD_URL) {

		this.$onInit = function () {
			this.todolistItem = {
				owner: this.currentTodolistId,
				user: this.currentUser
			}
		}

		this.refreshForm = function () {
			this.todolistItem.description = '';
			this.todolistItem.item = '';
		}


		this.createTodolistItem = (todolistItem) => {
			todolistService.createTodolistItem(todolistItem)
			.then((newItem)=>{
				this.refreshList({newItem:newItem});
				this.refreshForm();
			})
		}

	},
	bindings: {
		currentUser: '<',
		currentTodolistId: '<', //Data Binding Issues and Resolutions: https://medium.com/front-end-hacking/angularjs-component-binding-types-my-experiences-10f354d4660
		refreshList: '&' // Function Bindings: http://www.codelord.net/2016/05/13/understanding-angulars-and-binding/
	}
});