//SPA Applications (single page)
	// You no longer need to reload the entire application to change pages or update applicaiton model, just the part of the page you are changing
	// Keeps track of history, so you can still use back button




//Angular 1.6

// Angular Modules
	// Angular modules are just like a container for:
		// Controllers
		// Routes
		// Factories/Services
		// Directives
		// Filters
	// You can break different parts of your application into different containers

// Angular Directives
	ng-app // Is an example of an HTML directive
	<html ng-app>

	//  

// Angular Initialization (or bootstrapping)
	
	// You can bootstrap (initialize) your applicaiton manually by using ng-app like so:
		<html ng-app=ng-app="simpleToDoApp">

	// Three important things oc
		//1. The injector that will be used for dependency injection is created.

		//2. The injector will then create the root scope that will become the context for the model of our application.

		//3. AngularJS will then "compile" the DOM starting at the ngApp root element, processing any directives and bindings found along the way.