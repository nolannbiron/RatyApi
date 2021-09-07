var mongoose = require('mongoose');

const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useNewUrlParser: true
};
mongoose.connect('mongodb+srv://nolann:Pullin98@cluster0.jcczk.mongodb.net/travelApp?retryWrites=true&w=majority', option);

var conn = mongoose.connection;

conn.on('connected', function() {
    console.log('database is connected successfully');
});

conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
});

conn.on('error', console.error.bind(console, 'connection error:'));

module.exports = conn;