require('dotenv').config();

const Express = require('express');
const dbConnection = require('./db');
const middleware = require('./middleware');

const app = Express();

app.use(middleware.CORS);
app.use(Express.json());

const controllers = require('./controllers');

app.use('/user', controllers.usercontroller)
app.use('/tab', controllers.tabcontroller)
app.use('/comment', controllers.commentcontroller)

dbConnection.authenticate()
    .then(() => dbConnection.sync(/*{force: true}*/))
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}.`)
        })
    })
    .catch((err) => {
        console.log('[Server]: Server Crashed');
        console.log(err);
    })
