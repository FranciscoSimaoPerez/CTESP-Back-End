// config/passport.js
var mysql = require('mysql');
// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// MySQL connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'akaiito'
})
console.log("MySQL connection created at %s with database: %s", connection.config.host, connection.config.database);

// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        // select from users where id =   
        connection.query("select * from `cliente` where `ID_Cliente` = "+ id, function(err, rows){
            done(err, rows[0]);
        });     
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) {
            connection.query("SELECT `Email` FROM `cliente` WHERE `Email` = '" + email + "'", function(err, rows){
                if (err)
                    return done(err);
                if (rows.length){
                    return done(null, false, req.flash('signupMessage', 'That email is already taken'));
                } else {
                    var newUserMysql = new Object();
                    newUserMysql.email = email;
                    newUserMysql.password = password;

                    var query = "INSERT INTO cliente (Email, Palavra_Passe) values ('" + email + "','"+ password + "')";
                    
                    connection.query(query, function(err, rows){
                        newUserMysql.id = rows.insertId;
                        return done(null,  newUserMysql);
                    });    

                    // var query = "INSERT INTO cliente (Username, Nome, Tipo_de_Cliente, Morada, Palavra_Passe, Contacto, Email, Data_de_Nascimento, Codigo_Postal, Localidade, Pais) values ?";
                    // var values = [[Username, Nome, Tipo_de_Cliente, Morada, Palavra_Passe, Contacto, Email, Data_de_Nascimento, Codigo_Postal, Localidade, Pais]];
                   
                    //var values = [[email, password]];
                    // connection.query(query, [values], function(err, result, fields){
                    //     if (err) throw err;
                    //     var user = new Object();
                    //     user.id = result.insertId;
                    //     return done(null, user);
                    // });


                }
            })
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists             
        }));
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'username',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) { // callback with email and password from our form 
            connection.query("SELECT * FROM `cliente` WHERE `Username` = '"+ username + "'", function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length){
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }

                if(!(rows[0].password == password))
                    return done(null, false, req.flash('loginMessage', 'Ooops! Wrong password.'))
                return done(null,rows[0])
            });                       
        }));
};