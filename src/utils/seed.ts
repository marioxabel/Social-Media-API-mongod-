import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';

// Connect to the database
db.once('open', async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('Old data cleared.');

    // Define some thoughts manually
    const thoughts = [
      { thoughtText: 'This is a cool thought from User1!', username: 'User1' },
      { thoughtText: 'Another interesting thought from User2.', username: 'User2' },
      { thoughtText: 'A thoughtful message from User3.', username: 'User3' },
    ];

    // Insert thoughts into the database
    const insertedThoughts = await Thought.insertMany(thoughts);
    console.log(`${insertedThoughts.length} thoughts inserted.`);

    // Define some users manually and link them with the inserted thoughts
    const users = [
      {
        username: 'User1',
        email: 'user1@example.com',
        thoughts: [insertedThoughts[0]._id],
        friends: [], // Friends will be added later
      },
      {
        username: 'User2',
        email: 'user2@example.com',
        thoughts: [insertedThoughts[1]._id],
        friends: [],
      },
      {
        username: 'User3',
        email: 'user3@example.com',
        thoughts: [insertedThoughts[2]._id],
        friends: [],
      },
    ];

    // Insert users into the database
    const insertedUsers = await User.insertMany(users);
    console.log(`${insertedUsers.length} users inserted.`);

    // Add friends (create connections between users)
    await User.updateOne(
      { _id: insertedUsers[0]._id },
      { $push: { friends: [insertedUsers[1]._id, insertedUsers[2]._id] } } // User1 has User2 and User3 as friends
    );
    await User.updateOne(
      { _id: insertedUsers[1]._id },
      { $push: { friends: [insertedUsers[0]._id] } } // User2 has User1 as a friend
    );
    await User.updateOne(
      { _id: insertedUsers[2]._id },
      { $push: { friends: [insertedUsers[0]._id] } } // User3 has User1 as a friend
    );

    console.log('Friends added to users.');

    console.log('Database seeding completed successfully!');
    process.exit(0); // Exit the process after seeding is complete
  } catch (err) {
    console.error('Error during seeding:', err);
    process.exit(1); // Exit with an error code if something goes wrong
  }
});
