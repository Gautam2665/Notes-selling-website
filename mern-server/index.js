const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors=require('cors')

//middleware
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
  res.send('Hello World!')
})



//mongodb config

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mern-notes-store:42Lgr7mcEJ3QnH5Z@cluster0.4bstz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    //create a collection for the documents
    const noteCollections=client.db("notesInventory").collection("notes");

    //insert a book to the database using post method
    app.post("/upload-notes",async(req,res)=>{
        const data=req.body;
        const result=await noteCollections.insertOne(data);
        res.send(result);
    })

    //get all notes from database
    app.get("/all-notes",async(req,res)=>{
        const notes= noteCollections.find();
        const result=await notes.toArray();
        res.send(result);
    })

    //update notes data
    app.patch("/notes/:id",async(req,res)=>{
        const id=req.params.id;
        //console.log(id)
        const updateNotesData=req.body;
        const filter={_id: new ObjectId(id)};
        const options={upsert: true};
        const updateDoc={
            $set:{
                ...updateNotesData
            }
        }

        const result=await noteCollections.updateOne(filter,updateDoc,options);
        res.send(result);
    })

    app.delete("/notes/:id",async(req,res)=>{
        const id=req.params.id;
        const filter={_id: new ObjectId(id)};
        const result=await noteCollections.deleteOne(filter);
        res.send(result);
    })

    //find by category
    app.get("/all-notes",async(req,res)=>{
        let query={};
        //console.log(query);
        if(req.query?.category){
            query={category:req.query.category};
        }
        console.log(query);
        const result=await noteCollections.find(query).toArray();
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})