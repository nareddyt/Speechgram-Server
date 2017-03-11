var app = require('express')();
var bodyParser = require('body-parser');
var util = require('util');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var edge = require('edge');
var params = {
    connectionString: "Server=tcp:imagine-soundgram.database.windows.net,1433;Initial Catalog=SoundGram SQL DB;Persist Security Info=False;User ID=nareddyt;Password=admintest0!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;",
    source: "SELECT * FROM users"
};
var getData = edge.func('sql', params);

getData(null, function (error, result) {
    if (error) { console.log(error); return; }
    if (result) {
        console.log(result);
    }
    else {
        console.log("No results");
    }
});

// var Connection = require('tedious').Connection;
// var config = {
//     userName: 'nareddyt',
//     password: 'admintest0!',
//     server: 'imagine-soundgram.database.windows.net',
//     // If you are on Microsoft Azure, you need this:
//     options: {encrypt: true, database: 'AdventureWorks'}
// };
// var connection = new Connection(config);
// connection.on('debug', function(err) {
//     console.log('debug:', err);
// });
// connection.on('connect', function(err) {
//     if (err) return console.error(err);
// });

var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

app.get('/usersAdd', function(req, res) {
    console.log('GET with Query Params: ' + util.inspect(req.query));

    var uid = req.query.uid;
    var name = req.query.name;

    insertUser(uid, name);

    res.sendStatus(200);
});

app.get('/users', function(req, res) {
    console.log("GET with Query Params: " + util.inspect(req.query));

    res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Server listening on port ' + (process.env.PORT || 3000));
});

function insertUser(uid, name) {
    request = new Request("INSERT INTO users VALUES (uid, name);", function(err) {
        if (err) {
            console.log(err);}
    });

    request.addParameter('uid', TYPES.NVarChar, uid);
    request.addParameter('name', TYPES.NVarChar , name);

    connection.execSql(request);
    console.log('Inserted' + uid + ' as ' + name);
}