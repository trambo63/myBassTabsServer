require('dotenv').config();

const Express = require('express');
const app = Express();

app.listen(process.env.PORT, () => {
    console.log(`[Server]: App is listening on ${process.env.PORT}.`)
})