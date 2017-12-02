portfolioApp.component('projectList', {
	template: require('./projects.template.html'),
	controller: function GreetUserController() {
	  this.projects = [
	    {
	      title: 'Project A',
	      description: 'Fast just got faster with Nexus S.'
	    }, {
	      title: 'Project B',
	      description: 'The Next, Next Generation tablet.'
	    }, {
	      title: 'Project C',
	      description: 'The Next, Next Generation tablet.'
	    }
	  ];
	}
});