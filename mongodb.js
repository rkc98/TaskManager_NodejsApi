// const mongodb = require("mongodb");

// const mongoClient = mongodb.MongoClient;

// const objectId = mongodb.ObjectId;

// const id = objectId();
// // console.log(id.getTimestamp(), id);

// const connectionUrl = "mongodb://127.0.0.1:27017";
// const database = "TaskManager";

// mongoClient.connect(connectionUrl, (error, client) => {
//   if (error) {
//     return console.log(error);
//   }

//   console.log("connected");
//   const db = client.db(database);
//   db.collection("users")
//     .updateOne(
//       { name: "abc" },
//       {
//         $set: {
//           name: "bac",
//         },
//       }
//     )
//     .then((result) => {
//       // console.log(result);
//     })
//     .catch((err) => console.log(err));

//   // db.collection("users").insertOne(
//   //   {
//   //     _id: id,
//   //     name: "userId",
//   //     age: 44,
//   //   },
//   //   (error, result) => {
//   //     if (error) {
//   //       return console.log("unable to insert user");
//   //     }
//   //     console.log(result.ops);
//   //   }
//   // );

//   //   db.collection("users").insertMany(
//   //     [
//   //       {
//   //         name: "node",
//   //         age: 33,
//   //       },
//   //       {
//   //         name: "React",
//   //         age: 22,
//   //       },
//   //     ],
//   //     (error, result) => {
//   //       if (error) {
//   //         return console.log(error);
//   //       }
//   //       console.log(result.insertedCount);
//   //     }
//   //   );

//   //   db.collection("task").insertMany(
//   //     [
//   //       {
//   //         description: "some data goes here",
//   //         status: true,
//   //       },
//   //       {
//   //         description: "some more data goes here",
//   //         status: false,
//   //       },
//   //       {
//   //         description: "some less data goes here",
//   //         status: true,
//   //       },
//   //     ],
//   //     (error, result) => {
//   //       if (error) {
//   //         return console.log(error);
//   //       }
//   //       console.log(result.insertedCount);
//   //     }
//   //   );
// });
