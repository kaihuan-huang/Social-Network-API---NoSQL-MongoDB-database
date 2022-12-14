const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomThoughts, getRandomName} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.collection.drop();

  // Drop existing users
  await User.collection.drop();

  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add students to the users array
  for (let i = 0; i < 20; i++) {
    // Get some random thought objects using a helper function that we imported from ./data
    const thoughts = getRandomThoughts(20);
    const userNames = getRandomName(); //return string

    users.push({
      userNames,//data.js
      thoughts
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.collection.insertOne({
    thoughtText: 'I feel great!',
    email: [...email],
    users: [...users],
    reaction: [...reactions]
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
