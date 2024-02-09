const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

client.connect()
  .then(async () => {
    console.log('db connected');

    const db = client.db('first_day_db');
    const uc = db.collection('users');

    try {
      // const users = await uc.find().toArray();

      // console.log(users);

      // Create a user
      // await uc.insertOne({
      //   email: 'bob@test.com',
      //   password: 'password123'
      // });

      // console.log('user inserted');

      // Find one user by some property
      const jd = await uc.findOne({
        _id: new ObjectId('65c64b2d6939dcf969e8e511')
      });

      console.log(jd);

    } catch (err) {
      console.log(err);
    }
  });

// class Person {

// }

// const jd = new Person();