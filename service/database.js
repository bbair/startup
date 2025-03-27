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
    return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function getColors(token) {
    return (await colorCollection.findOne({ user: token })).colors;
}

async function addColors(colors) {
    await colorCollection.insertOne(colors);
}

async function updateColors(colors) {
    await colorCollection.updateOne({ user: colors.user }, { $set: colors });
}

async function updateColorsWithToken(oldToken, newToken) {
    await colorCollection.updateOne({ user: oldToken }, { $set: { user: newToken } });
}

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    getColors,
    addColors,
    updateColors,
    updateColorsWithToken,
};