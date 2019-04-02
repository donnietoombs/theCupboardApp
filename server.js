var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var session = require('express-session');

var methodOverride = require("method-override")

var recipeRoutes = require("./routes/recipe");
var indexRoutes = require("./routes/index");


mongoose.connect('mongodb://localhost:27017/theCupboard_db', {
  useNewUrlParser: true
});

app.use(express.static(__dirname + '/public'));

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
  helpers: {
    json: function (value, options) {
      return JSON.stringify(value);
    }
  },
  defaultLayout: "main",
}));
app.set("view engine", "handlebars");

// Lines below are necessary when using passport
app.use(
  session({
    secret: 'The Redskins Are The Best',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// whatever function we call with app.user will run for every route
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// seedDB(); 


/* You can change the routes below to look like this: 

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

---This allows you to stipulate in app.js that all routes the start with
/campgrounds can use campgroundRoutes(you need to shorten the route for example if the route
	is /campground/new then you would make it /new because /campground is added in the app.js by default)*/

/* The one issue with doing it this way req.params does not come through 
like it should. You have to add the option {mergeParams: true} into the express.Router(); in the routes folders
it would look like this: 
var express = express.Router({mergeParams: true}). This will fix it */

// I am leaving it the original way for now to see the whole route for testing purposes.

// app.use(recipeRoutes);
app.use(indexRoutes);
app.use(recipeRoutes);



// PORT AND SERVER START
var PORT = process.env.PORT || 4500;

app.listen(PORT, function () {
  console.log('The Simple Kitchen App Server is Running ' + PORT);
});