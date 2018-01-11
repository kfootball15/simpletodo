simpleToDoApp.component('home', {
	templateUrl: '/js/home/home.template.html',
	controller: function homeController(PROD_URL) {
		
		this.$onInit = function () {
			this.prodUrl = PROD_URL;
		}
	}
});