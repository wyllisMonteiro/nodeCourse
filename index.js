let express = require('express');
let mysql = require('mysql');

let app = express();

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'wmonteir'
});

app.set('view engine', 'twig');

app.get('/', function( req, res ) {
    res.render('templates/index');
})
.get('/projects', function( req, res ) {
    let arrayProjects = [];
    
    connection.connect();

    connection.query('SELECT * FROM projects', function ( error, results, fields ) {
        //if (error) throw error;
        res.render('templates/projects');
    });

    connection.end();
})
.get('/project/:numProj', function( req, res ) {
    var regex = /[0-9]/g;

    if( req.params.numProj.match( regex ) == null ) {
    } else {

        connection.connect();
    
        connection.query('SELECT * FROM projects WHERE id=' + req.params.numProj, req.params.numProj, function ( error, results, fields ) {
            //if (error) throw error;
            res.render('templates/project' );
        });

        connection.end();
    }
});

app.listen(8080);