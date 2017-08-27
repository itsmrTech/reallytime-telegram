var mongoose = require('mongoose');


module.exports = {
    run: function() {
        // Connect to the local database
        mongoose.connect('localhost:27017/reallytime');

        // Make sure the database is connected
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Connection error:'));
        db.once('open', function () {
            console.log('Database Connected.');

            



        });
    }
};
