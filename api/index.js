import Database from "./database/database";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./routes/user/user');
const blogRouter = require('./routes/blog/blogRoutes');
const projectRouter = require('./routes/project/projectRoutes');
const middlewareHandler = require('./middleware/middlewareHandler');

Database.init();

app.use(express.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '50mb',
    parameterLimit: 50000
}));

//app.use(middlewareHandler);
app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/project', projectRouter);

module.exports = {
  path: '/api',
  handler: app
};
