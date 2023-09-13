const express = require('express');
const { partials, helpers } = require('handlebars');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

//Initialization
const app = express();
require('./config/passport');

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        ifCond: function (v1, operator, v2, options) {
            switch (operator) {
                case "==":
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);

                case "!=":
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);

                case "===":
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);

                case "!==":
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);

                case "&&":
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);

                case "||":
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);

                case "<":
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);

                case "<=":
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);

                case ">":
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);

                case ">=":
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);

                default:
                    return eval("" + v1 + operator + v2) ? options.fn(this) : options.inverse(this);
            }
        }
    }
}));

app.set('view engine', '.hbs');

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.equipo = req.equipo || null;
    res.locals.fecha = req.fecha || null;
    next();
});

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/storage'));
app.use(require('./routes/storage2'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;