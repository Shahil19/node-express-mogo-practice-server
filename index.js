const express = require('express');
const app = express();
const port = 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;

//middle wire
const cors = require("cors");
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('welcome friend');
})



const uri = "mongodb+srv://dbUser1:ZcVXvv1UHWAMVuP4@cluster0.3ccto.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const userCollection = client.db('foodExpress').collection('users');

        // POST method (for insert a document to database)
        app.post('/user', async (req, res) => {
            const user = req.body; // receives data from client side
            console.log(user);
            const result = await userCollection.insertOne(user); // inserting document to database
            res.send(result)
        })

        // GET method (for sending multiple documents from database)
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users)
        })

        // DELETE method (to delete a document from database)
        app.delete('/user/:id', async (req, res) => {
            const id = req.params;
            console.log(id);
            const query = { _id: ObjectId(id) };
            // console.log(query);
            const result = await userCollection.deleteOne(query);
            res.send(result)
        })

        // send the user who need to update
        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const user = await userCollection.findOne(query);
            res.send(user)
        })

        //! Update user / doc
        //PUT method
        // app.put('/user/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const updatedUser = req.body;
        //     console.log(id);

        //     const filter = { _id: ObjectId(id) };
        //     const options = { upsert: true };
        //     const updateUser = {
        //         $set: {
        //             name: updatedUser.name,
        //             email: updatedUser.email
        //         },
        //     };
        //     const result = await userCollection.updateOne(filter, updateUser, options)
        //     res.send(result)
        // }
        // )

        app.put('/user/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
        })

    }
    finally { }
}
run().catch(console.dir);


// POST method
// app.post('/users', (req, res) => {
//     const user = req.body;
//     console.log(user);
//     res.send(user)
// })

app.listen(port, () => {
    console.log(`practice ${port}`);
})