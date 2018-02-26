# S2DO.me

[Speedy To Do](http://www.s2do.me)

## Intro:
Speedy to do is a super intuitive todo list application that allows users to bypass having to sign up and/or login to yet another web application and let them start using their todolists as quickly as possible

Simply generate new todolists by typing them directly into the url for a fast, efficient way of creating a quick todolist.

The format is like so:
```
s2do.me/<username>/<todolist>/<todo>
```
For Example:
```
s2do.me/jeff/newlist/newitem
```
To Create a new username: (sort of like a namespace for your lists to make sure nobody else overwrites them)
```
s2do.me/<username>
```
To Create a new todo list:
```
s2do.me/<username>/<todolist>
```
To Create a new todo:
```
s2do.me/<username>/<todolist>/<todo>
```

The website itself also has a UI for interfacing with your lists and items for convenient updates after you have created your items.

### To run:
```
npm install
bower install

Must have nodemon installed (npm install -g nodemon)
Must have mongo instance running

npm start (will run sass to compile css and run node <app.js>)
```

To Push to Heroku:
```
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
```
