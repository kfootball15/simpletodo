simpleToDoApp.component('headerNav', {
	templateUrl: '/js/headerNav/headerNav.template.html',
	controller: function todolistController() {
		this.links = [
			{
				text: "Home",
				state: "home"
			}
		];
	}
});