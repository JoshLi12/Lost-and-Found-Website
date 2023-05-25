const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const axios = require('axios');
const port = 3000

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


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


var monthConversion = new Map([
  [1, "Jan"],
  [2, "Feb"],
  [3, "Mar"],
  [4, "Apr"],
  [5, "May"],
  [6, "Jun"],
  [7, "Jul"],
  [8, "Aug"],
  [9, "Sep"],
  [10, "Oct"],
  [11, "Nov"],
  [12, "Dec"]
])

const date = new Date();
var month = date.getMonth();
var day = date.getDate();
var year = date.getFullYear();
var todayDate = monthConversion.get(month+1) + " " + day + ", " + year;


async function getAllItems() {
  try {
    const response = await fetch("https://data.mongodb-api.com/app/data-lnnyq/endpoint/data/v1/action/find", config);
    const jsonData = await response.json();
    // console.log(JSON.stringify(jsonData));
  } catch(e) {
    console.log(e)
  }
}

// send or upload data to be processed
app.post('/upload', async function(req, res) {
  // TODO: Upload to cloud database
  console.log("Post to /upload");
  console.log(req.body.idBox);

  const postData = {
    "dataSource": "Cluster0",
    "database": "Lost-and-found-website",
    "collection": "items",
    "document": {
      'id': req.body.idBox,
      'name': req.body.nameBox,
      'date': todayDate,
      'tags': {
        0: req.body.tagsBox
      }
    }
  }

  const headers = {
    'Content-Type': 'application/ejson',
    'Accept': 'application/json',
    'apiKey': '1t2ojJgJtxKAeQ2eAReH81GKV6iejlKUkMPxNQEMhyaeLP3FnOX5PGomIcndciad'
  }
  
  // Make post request to cloud database
  axios.post('https://data.mongodb-api.com/app/data-lnnyq/endpoint/data/v1/action/insertOne', postData, { headers })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });


  res.redirect('/');
  // res.sendFile(path.join(__dirname + '/public', '/upload.html'));
});

app.get('/upload', async function(req, res) {
  // Execute any JS code that we want 

  res.sendFile(path.join(__dirname + '/public', '/upload.html'));
});

app.get('/', async function(req, res) {
    console.log("getting from /")
    const data = await getAllItems();
    // TODO: fetched data successfully, now pass data to the template
    res.sendFile(path.join(__dirname + '/public', '/home.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})

