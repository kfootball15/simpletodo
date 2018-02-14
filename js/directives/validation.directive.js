simpleToDoApp.directive('validDescription', function () {
	return {
		require: 'ngModel',
		link (scope, element, attrs, ctrl) {
			ctrl.$validators.validDescription = function (modelValue, viewValue) {
				if (ctrl.$isEmpty(modelValue)) {
		          return true;
		        }

				const usernameRegex = /^[a-zA-Z0-9_ ]+$/
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
simpleToDoApp.directive('validTitle', function () {
	return {
		require: 'ngModel',
		link (scope, element, attrs, ctrl) {
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
