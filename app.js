// # App # 

// # Import
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const session = require('express-session');
const createHttpError = require('http-errors');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash');
const { ensureLoggedIn } = require('connect-ensure-login');
const { roles } = require('./utils/constants');

// # Express App Initialization
const app = express();
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// # Session Store
const MongoStore = connectMongo(session);

// # Initialize Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// # For Passport JS Authentication
app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport');

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// # Connect Flash
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// # Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use(
  '/user',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  require('./routes/user')
);
app.use(
  '/admin',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureAdmin,
  require('./routes/admin')
);

// # 404 Handler
app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

// # Error Handler
app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.render('error_40x', { error });
});

// # Setting the PORT
const PORT = process.env.PORT || 3000;

// # Making MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('🚀 ' + 'eAuth Server Connected...🎉');
    console.log('🚀 ' + 'eAuth Database Connected...🎉');
    app.listen(PORT, () => console.log('🔗 Link: ' + `http://localhost:${PORT}`));
  })
  .catch((err) => console.log(err.message));

// # Admin Middleware
function ensureAdmin(req, res, next) {
  if (req.user.role === roles.admin) {
    next();
  } else {
    req.flash('🚫 Warning: ', 'You are not Authorized to see this route!');
    res.redirect('/');
  }
}

// # Moderator Middleware
function ensureModerator(req, res, next) {
  if (req.user.role === roles.moderator) {
    next();
  } else {
    req.flash('🚫 Warning: ', 'You are not Authorized to see this route!');
    res.redirect('/');
  }
}