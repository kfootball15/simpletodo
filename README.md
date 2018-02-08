To run:
	npm install
	bower install

	Must have nodemon installed (npm install -g nodemon)
	Must have mongo instance running

	npm start (will run sass to compile css and node <app.js>)

To Push to Heroku:
Heroku Needs a Git Repository, create one:
	heroku create
Push To it:
	git push heroku 
	If this does not work, create new remote manually and push to that:
		git remote add heroku <heroku git link>
		git push heroku
To Open the website:
	heroku open
If There are Heroku Errors, run:
	heroku logs