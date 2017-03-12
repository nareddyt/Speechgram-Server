var app = require('express')();
var bodyParser = require('body-parser');
var util = require('util');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger);

var edge = require('edge');
require('edge-sql');

// Your own super cool function
var logger = function(req, res, next) {
    console.log("GOT REQUEST !");
    next(); // Passing the request to the next handler in the stack.
}

app.get('/usersAdd', function(req, res) {
    console.log('GET with Query Params: ' + util.inspect(req.query));

    var uid = req.query.uid;
    var name = req.query.name;

    insertUser(uid, name);

    res.sendStatus(200);
});

app.get('/users', function(req, res) {
    console.log("GET with Query Params: " + util.inspect(req.query));

    var getAllUsers = {
        connectionString: "Server=tcp:imagine-soundgram.database.windows.net,1433;Initial Catalog=SoundGram SQL DB;Persist Security Info=False;User ID=nareddyt;Password=admintest0!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;",
        source: "SELECT * FROM users"
    };
    var getData = edge.func('sql', getAllUsers);

    getData(null, function (error, result) {
        if (error) {
            console.log(error);
            return;
        }

        console.log('Sending the following users back');
        if (result) {
            console.log(result);
            res.send(result);
        }
        else {
            console.log("No results");
        }
    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Server listening on port ' + (process.env.PORT || 3000));
});

function insertUser(uid, name) {
    var getAllUsers = {
        connectionString: "Server=tcp:imagine-soundgram.database.windows.net,1433;Initial Catalog=SoundGram SQL DB;Persist Security Info=False;User ID=nareddyt;Password=admintest0!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;",
        source: "INSERT INTO users VALUES (@q_uid, @q_name)"
    };
    var getData = edge.func('sql', getAllUsers);

    getData({q_uid: uid, q_name: name}, function (error, result) {
        if (error) {
            console.log(error);
            return;
        }

        console.log('Adding a user');
        if (result) {
            console.log(result);
        }
        else {
            console.log("No results");
        }
    });
}
