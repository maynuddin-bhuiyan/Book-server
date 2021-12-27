// Basic Working

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient } = require('mongodb');


const port = process.env.PORT || 7000;


//Middleware 

app.use(cors());
app.use(express.json());



// Functionally Working,



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l2npz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


console.log(uri);



async function runerw () {
    try{
      await client.connect();
      const database = client.db('Book-Reader');
      const categorywiseCollection = database.collection('Categorywise');
      const studentCollection = database.collection("student");
      // const studentAddCollection = database.collection("addstudent");

      app.get('/categorywise', async(req , res) => {
        
        const cursor = categorywiseCollection.find({});
        const Categorywise = await cursor.toArray();
        res.send(Categorywise);
  
    });


    app.get('/student', async(req , res) => {
        
      const cursor = studentCollection.find({});
      const student = await cursor.toArray();
      res.send(student);

  });

  app.post('/student', async(req, res) => {
    const addstudent = req.body;
    console.log("Hit the post api", addstudent);

    const result = await studentCollection.insertOne(addstudent);
    console.log(result);

  

    res.json(result);


})
    
      
  
  
  
  
    
  
  
  
      
  
    }
    finally{
      //  await client.close();
    }
  }




  runerw().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})