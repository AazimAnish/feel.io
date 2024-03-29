const { MongoClient, ServerApiVersion } =  require('mongodb');
const express = require('express')
port = 3000

app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors({origin: "*"}));


app.post('/', (req, res) => {
  const requestData = req.body;
  run(requestData).then(x=>{res.send(x)})
});

app.post('/lasthours', (req, res) => {
  runk(req.body.hours).then(x=>{res.send(x)})
});

app.post('/happy', (req, res) => {
  runa(req.body.hours).then(x=>{res.send(x)})
});

app.post('/normalmoods', (req, res) => {
  runj().then(x=>{res.send(x)})
});

app.post('/journalentry', (req, res) => {
  runp(req.body).then(x=>{res.send(x)})
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

async function runp(requestData) {
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
  const feelio = database.collection("journal");
  const result = await feelio.insertOne(requestData);
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
  return requestData
}

async function runk(hours) {
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
  
  const aggregation = [
    
    {
      $match: {
        timestamp: {
          $gte: Date.now() - 60*60*1000*hours   // Current time in seconds minus 3600 seconds (1 hour)
        }
      }
    },
    {
      $group: {
        _id: "$mood",
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        mood: "$_id",
        count: 1
      }
    },
    {
      $sort: { count: -1 } // Sort by count in descending order
    },
    {
      $limit: 3 // Limit the result to the top 3 moods
    }
  ]
  const result2 = await feelio.aggregate(aggregation).toArray();
  console.log(result2)
  return result2
}


async function runj() {
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
  
  const aggregation = [
    {
      $match: {
        mood: {
          $in: ["joy", "anger", "neutral", "sadness"]
        },
        timestamp: {
          $gte: (Date.now() / 1000) - 3600 * 24 * 30  // Current time in seconds minus 3600 seconds (1 hour)
        }
      }
    },
    {
      $group: {
        _id: "$mood",
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        mood: "$_id",
        count: 1
      }
    },
    {
      $group: {
        _id: null,
        moodCounts: {
          $push: {
            k: "$mood",
            v: "$count"
          }
        }
      }
    },
    {
      $replaceRoot: {
        newRoot: {
          $arrayToObject: "$moodCounts"
        }
      }
    }
  ]
  const result2 = await feelio.aggregate(aggregation).toArray();
  console.log(result2)
  return result2
}


async function runa(hour) {
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
  
  const aggregation = [
    {
      $match: {
        mood: "joy",
        timestamp: {
          $gte: Math.floor(Date.now() / 1000) - hour * 24 * 60 * 60 // 30 days in seconds
        }
      }
    },
    {
      $group: {
        _id: "$joy",
        joyCount: { $sum: 1 }
      }
    }
    
  ]
  const result2 = await feelio.aggregate(aggregation).toArray();
  console.log(result2)
  return JSON.stringify(result2)
}



