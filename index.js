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



async function runerw() {


  // try Mothed,

  try {
      await client.connect();
      const database = client.db('book-man');
      const courseCollection = database.collection('course');




      // creating an array in eay-world used security-camera,
      app.get('/course', async (req, res) => {

          const cursor = courseCollection.find({});
          const coursewise = await cursor.toArray();
          res.send(coursewise);

      });




    
      


    


      
    
















  }
  finally {
      //  await client.close();
  }
}




  runerw().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Hello Book Man')
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})