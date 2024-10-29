import express from "express"
import { MongoClient, ObjectId } from "mongodb";

let port =3000;
let app= express();

// mongodb connection string
let uri = `mongodb+srv://felistanjeri91:${process.env.MONGODB_PASSWORD}@cluster0.fgxsd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

let client =new MongoClient(uri);

let db =client.db("movies");
let collection =db.collection("movies");

// home route
app.get('/',async (req ,res) =>{
    

    
    res.send("ok");
});
// movies route
// app.get('/movies',async (req ,res) =>{
   


//     let movies = await collection.find().toArray();

    
//     res.json(movies);
// });

// individual movie route by id
app.get('/movies/:id',async (req ,res) =>{
   let id = req.params.id;


    let movie = await collection.findOne({_id: new ObjectId(id)});

    
    res.json(movie);
});

// movies route (filtered and all)
app.get('/movies',async (req ,res) =>{
    // get query params if any eg ?genre=action
    let query = req.query;
    let genre = query.genre;

    if (genre) {
        console.log({query});

    let movies = await collection.find({genre: genre}).toArray();
    res.json(movies);
    }else {
        let movies = await collection.find().toArray();
        res.json(movies); 
    }
    
});

app.listen(port, () => console.log("Server listening on port", port));
