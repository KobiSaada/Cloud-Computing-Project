const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url =  "mongodb+srv://kobi:Kobian054@cluster0.ze2y4.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "Cluster0";
                      
 async function get() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("callreports");



         // Find one document
         const myDoc = await col.find();
         // Print to the console
         console.log(myDoc);
        return myDoc;
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

async function add() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("callreports");


         // Find one document
         const myDoc = await col.find().toArray();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

async function update() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("callreports");


         // Find one document
         const myDoc = await col.find().toArray();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

//run().catch(console.dir);
module.exports= {add,get,update
};

