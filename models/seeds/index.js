const connection = require('../../config/connections');
const User = require('../user');
const Thought = require('../thought');
connection.on('error', (err) => err);

connection.once('open', async () => {
    await User.collection.drop()
    await Thought.collection.drop()
    await seedData()

    process.exit(0)
});

async function seedData(){
    await User.create({
        username: "Josh",
        email: "jd@yahoo.com",
        friends: [],
    })
    await User.create({
        username: "Josh2",
        email: "jd2@yahoo.com",
        friends: [],
    })
    await Thought.create({
        thoughtText: "Nothing behind these eyes",
        username: "Josh2",
    })
}