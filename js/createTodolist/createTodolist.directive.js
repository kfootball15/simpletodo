simpleToDoApp.directive('validTitle', function(){
	return {
		require:'ngModel', //Requires a controller and sets it to ctrl below
		link(scope, element, attrs, ctrl) {
			//ctrl.$validators contains all of the form directives validators
			ctrl.$validators.validTitle = function (modelValue, viewValue) {
				if (ctrl.$isEmpty(modelValue)) {
		          return true;
		        }

				const usernameRegex = /^[a-zA-Z0-9_]+$/
		        if (usernameRegex.test(viewValue)) {
		          //valid
		          return true;
		        }

		        //invalid
		        return false;
			}
		}
	}
})