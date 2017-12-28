simpleToDoApp.component('home', {
	templateUrl: '/js/home/home.template.html',
	controller: function homeController(PROD_URL) {
		
		this.$onInit = function () {
			this.prodUrl = PROD_URL;
		    this.explanation = "Here is how the Simple To Do list Application works"
		    this.todolist = [
			  	{
			  		item: "Pick up Groceries",
			  		description: "Go to the grocery store and pick up the things on this list",
			  		list: {
			  			title: "Groceries",
			  			items: ["milk", "eggs", "cat food", "dog food", "diapers"]
			  		}
			  	},
			  	{
			  		item: "Do the Dishes",
			  		description: "Clean the dishes and do it properly"
			  	},
			  	{
			  		item: "Pick up Kenny From school",
			  		description: "He needs to be picked up from school at 2:00pm"
			  	}
		    ]
		}
	}
});