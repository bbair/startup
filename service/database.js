const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const colorCollection = db.collection('color');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    try {
        await db.command({ ping: 1 });
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

function getUser(email) {
    return userCollection.findOne({ email: email }).then(user => user);
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token }).then(user => user);
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ email: user.email }, { $set: user });
}

function getColors(user) {
    return colorCollection.findOne({ user: user }).then(colorsCollectionObject => colorsCollectionObject.colors);
}

async function addColors(colors) {
    await colorCollection.insertOne(colors);
}

async function updateColors(colors) {
    await colorCollection.updateOne({ user: colors.user }, { $set: colors });
}

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    getColors,
    addColors,
    updateColors,
};