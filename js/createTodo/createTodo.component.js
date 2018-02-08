simpleToDoApp.component('createTodo', {
	templateUrl: '/js/createTodo/createTodo.template.html',
	controller: function createTodolistItemController(todolistService, PROD_URL) {

		this.$onInit = function () {
			this.todolistItem = {
				owner: this.currentTodolistTitle,
				user: this.currentUser
			}
		}

		this.refreshForm = function (form) {
			this.todolistItem.description = '';
			this.todolistItem.title = '';
		    if (form) {
		      form.$setPristine();
		      form.$setUntouched();
		    }
		}

		this.createTodo = (isValid, form) => {
			console.log(isValid)
			if (isValid) {
				todolistService.createTodo(this.todolistItem)
				.then((newItem)=>{
					this.refreshList({newItem:newItem});
					this.refreshForm(form);
				})
			}
		}

	},
	bindings: {
		currentUser: '<',
		currentTodolistTitle: '<', //Data Binding Issues and Resolutions: https://medium.com/front-end-hacking/angularjs-component-binding-types-my-experiences-10f354d4660
		refreshList: '&' // Function Bindings: http://www.codelord.net/2016/05/13/understanding-angulars-and-binding/
	}
});