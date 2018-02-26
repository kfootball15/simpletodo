simpleToDoApp.component('errorPageComponent', {
	templateUrl: '/js/errorPage/errorPage.template.html',
	controller: function ($stateParams) {
		this.$onInit = function () {
			if ($stateParams.errorMessage.data){
				// If we are getting data, then it is due to an improper URL
				this.errorTitle = $stateParams.errorMessage.data.error;
				this.errorMessage = $stateParams.errorMessage.data.explanation;
			} else {
				// If we are NOT getting data, it is due to a blank url (.../'')
				this.errorTitle = "Invalid URL";
				this.errorMessage = "URLs cannot contain blank entries, ie s2doo.com/myName/_____";
			}
		}
	}
})