const { MongoClient, ServerApiVersion } =  require('mongodb');
const express = require('express')
port = 3000
app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// Define a route to handle incoming JSON requests
app.post('/', (req, res) => {
  // Access the JSON data from the request body
  const requestData = req.body;
  run(requestData).then(x=>{res.send(x)})
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


async function run(requestData) {
    const uri = "mongodb+srv://mishal0404:mishal2003@mishal0404.35lsnon.mongodb.net/?retryWrites=true&w=majority";
    
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    const database = client.db("feelio");
    const feelio = database.collection("feelio");

    
    const result = await feelio.insertOne(requestData);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return requestData
}


