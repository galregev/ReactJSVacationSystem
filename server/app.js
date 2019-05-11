var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Import Dependencies.
var session = require('express-session')
const cors = require('cors');
const db = require('./db/db_conf');
const fileUpload = require('express-fileupload');
const socketconf = require('./socket.io/socket_conf');

// Define Routes.
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/member');
var vacationRouter = require('./routes/vacation');

// Apply middlewares.
var app = express();
app.use(cors({credentials: true, origin: "http://localhost:3001"}));
// Enable CORS.
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use(fileUpload());
app.use(session({
    cookie: { secure: false },
    secret: 'gal',
    saveUninitialized: true,
    resave: false
}));

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }))

// Define Socket.IO configration.
var server = require('http').createServer(app);
var io = require('socket.io')(server);
socketconf.startSockets(io);
server.listen(9999);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/member', usersRouter);
app.use('/vacation', vacationRouter);
app.use('/', indexRouter);

module.exports = app;
