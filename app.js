const express = require('express')
const dbConfig = require('./config/database.config');
const routes = require('./routers/index');
dbConfig.conn
const app = express()
app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({limit: '200mb'}));
app.use('/', routes);

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})