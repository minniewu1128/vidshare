var mongoose = require('mongoose');
var connection_string = 'mongodb://minniew:Yu35016188!@ds111496.mlab.com:11496/usersdb'

console.log(process.env.password)
if(process.env.password){
    console.log('using secret password')
    connection_string = `mongodb://minniew:${process.env.password}@ds111496.mlab.com:11496/usersdb`
}
mongoose.connect(connection_string)
console.log('connected to database via mongoose')