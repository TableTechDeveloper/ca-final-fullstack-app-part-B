const mongoose = require('mongoose')

async function databaseConnector(databaseURL) {
    await mongoose.connect(databaseURL)
    console.log('Database connection completed')
}

async function databaseDisconnector(){
    await mongoose.connection.close()
}

async function databaseClear(){
    await mongoose.connection.db.dropDatabase();
    console.log("Database dropped")
}

module.exports = {
    databaseConnector,
    databaseDisconnector,
    databaseClear
}