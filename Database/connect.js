var Connection = require('tedious').Connection;

var config = {
    server: 'pacelayersqlserver.database.windows.net',
    authentication: {
        type: 'default',
        options: {
            userName: 'UsrPaceLayer',
            password: 'PwdPaceLayer#'
        }
    },
    options: {
        database: 'PaceLayerDB',
        //instanceName: '',
        rowCollectionOnDone: true,
        useColumnNames: false
    }
}

var connection = new Connection(config);

connection.on('connect', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected');
    }
});

module.exports = connection;
