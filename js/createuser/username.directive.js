//This is a front end check to make sure our username is alphanumeric characters
simpleToDoApp.directive('validUsername', function(){
	return {
		require:'ngModel',
		link (scope, elem, attrs, ctrl) {
			//ctrl.$validators contains all of the form directives validators
			ctrl.$validators.validUsername = function (modelValue, viewValue) {
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

//This is a back end check to make sure our username is not already taken
simpleToDoApp.directive('uniqueUsername', function(){
	return {
		require:'ngModel',
		link: function (scope, elem, attrs, ctrl) {
			// ctrl.$validators.
		}
	}
})
