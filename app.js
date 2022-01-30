require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const coursesRouter = require('./routes/courses');
const mediaRouter = require('./routes/media');
const ordersRouter = require('./routes/orders');
const webhookRouter = require('./routes/webhook');
const usersRouter = require('./routes/users');
const refreshTokensRouter = require('./routes/refreshTokens');
const mentorsRouter = require('./routes/mentors');
const chaptersRouter = require('./routes/chapters');
const lessonsRouter = require('./routes/lessons');
const imageCoursesRouter = require('./routes/imageCourses');
const myCoursesRouter = require('./routes/myCourses');
const reviewsRouter = require('./routes/reviews');

const verifyToken = require('./middlewares/verifyToken');
const permissionTo = require('./middlewares/permission');

const app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/courses', coursesRouter);
app.use('/media', verifyToken, permissionTo('admin', 'student'), mediaRouter);
app.use('/orders', verifyToken, permissionTo('admin', 'student'), ordersRouter);
app.use('/webhook', webhookRouter);
app.use('/users', usersRouter);
app.use('/refresh-tokens', refreshTokensRouter);
app.use('/mentors', verifyToken, permissionTo('admin'), mentorsRouter);
app.use('/chapters', verifyToken, permissionTo('admin'), chaptersRouter);
app.use('/lessons', verifyToken, permissionTo('admin'), lessonsRouter);
app.use('/image-courses', verifyToken, permissionTo('admin'), imageCoursesRouter);
app.use('/my-courses', verifyToken, permissionTo('admin', 'student'), myCoursesRouter);
app.use('/reviews', verifyToken, permissionTo('admin', 'student'), reviewsRouter);

module.exports = app;