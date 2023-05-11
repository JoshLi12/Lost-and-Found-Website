const path = require('path');
const express = require('express')
const app = express()
const port = 3000

app.use(express.static("public"));

const payload = {
    "dataSource": "Cluster0",
    "database": "Lost-and-found-website",
    "collection": "items"
}

//    'Accept': 'application/json',

const config = {
                    "method": "POST",
                    "mode": "no-cors", 
                    "cache": "no-cache",
                    "headers": {
                        "apiKey": "1t2ojJgJtxKAeQ2eAReH81GKV6iejlKUkMPxNQEMhyaeLP3FnOX5PGomIcndciad",
                        "Content-Type": "application/ejson",
                    },
                    "body": JSON.stringify(payload)
                }

async function getAllItems() {
  try {
    const response = await fetch("https://data.mongodb-api.com/app/data-lnnyq/endpoint/data/v1/action/find", config);
    const jsonData = await response.json();
    console.log(JSON.stringify(jsonData));
  } catch(e) {
    console.log(e)
  }

}

app.get('/', async function(req, res) {
    console.log("getting from /")
    const data = await getAllItems();
    // TODO: fetched data successfully, now pass data to the template
    res.sendFile(path.join(__dirname + '/public', '/home.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})

