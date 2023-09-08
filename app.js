// // Import required AWS SDK clients and commands for Node.js.
// const { S3Client, PutObjectCommand, CreateBucketCommand } = require("@aws-sdk/client-s3");

// // Set the AWS Region.
// const REGION = "us-east-2";
// // Create an Amazon S3 service client object.
// const s3Client = new S3Client({ region: REGION });

// // Set the parameters
// const params = {
//   Bucket: "appleby-college-lost-and-found-website", // The name of the bucket. For example, 'sample-bucket-101'.
//   Key: "image1", // The name of the object. For example, 'sample_upload.txt'.
//   Body: "helloooooo", // The content of the object. For example, 'Hello world!".
// };

// const writeFile = async () => {
//   // Create an object and upload it to the Amazon S3 bucket.
//   try {
//     const results = await s3Client.send(new PutObjectCommand(params));
//     console.log(
//       "Successfully created " +
//       params.Key +
//       " and uploaded it to " +
//       params.Bucket +
//       "/" +
//       params.Key
//     );
//     return results; // For unit tests.
//   } catch (err) {
//     console.log("Error", err);
//   }
// };
// writeFile();

import fs from 'fs';
import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import session from 'express-session';
import passport from 'passport';
import { firebaseApp } from './firebase.js';
import { getStorage, ref, getDownloadURL, listAll, uploadBytes, deleteObject } from "firebase/storage";
import fetch from 'node-fetch';

import ejs from 'ejs';

// Use commonJS style __dirname
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// set up multer for file uploads
import multer from 'multer';
const upload = multer({ dest: './public/uploads/' });

const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.engine('html', ejs.renderFile);  // app.set('view engine', 'ejs');

const payload = {
    "dataSource": "Cluster0",
    "database": "Lost-and-found-websi`te",
    "collection": "items"
}

const headers = {
  'Content-Type': 'application/ejson',
  'Accept': 'application/json',
  'apiKey': '1t2ojJgJtxKAeQ2eAReH81GKV6iejlKUkMPxNQEMhyaeLP3FnOX5PGomIcndciad'
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

function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    console.log("User authenticated");
    return next(); // User is authenticated, proceed to the next middleware/route handler
  } else {
    console.log("User was not authenticated");
    res.redirect('/'); // Redirect to where we can login
  }
}

app.get('/admin', ensureAuthenticated, async (req, res) => {
  res.render(__dirname + '/public/admin.html');
});

async function getAllItems() {
  try {
    const response = await fetch("https://data.mongodb-api.com/app/data-lnnyq/endpoint/data/v1/action/find", config);
    const jsonData = await response.json();
    // console.log(JSON.stringify(jsonData));
    return jsonData;
  } catch(e) {
    console.log(e)
    return;  // return undefined
  }
}

const correctPassword = "password";
app.post('/login', (req, res) => {
  console.log(req.body);
  req.session.message = "";
  if (req.body.enterPassword === correctPassword) {
    req.session.user = "Admin";
    res.redirect('/admin');  // TODO: redirect to admin page
  } else {
    req.session.message = "*Invalid Login";
    res.redirect('/');  // redirect to home
  }
})

app.post('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/');
})

app.post('/deleteInfo', ensureAuthenticated, (req, res) => {
  let id = req.query.id

  const postData = {
    "dataSource": "Cluster0",
    "database": "Lost-and-found-websi`te",
    "collection": "items",
    "filter": {
      "id": id
    }
  }

  // TODO: Make sure this is the right api route
  // Make post request to cloud database
  axios.post(`https://data.mongodb-api.com/app/data-lnnyq/endpoint/data/v1/action/deleteOne`, postData, { headers })
    .then(response => {
      console.log(response.data);
      if (response.status === 200) {
        deleteImage(id);
      
        res.redirect('/admin'); 
        return 200
      }

      res.redirect('/admin'); 
    })
    .catch(error => {
      console.error(error);
    });  
  
})

app.post('/upload', ensureAuthenticated, upload.single('image'), (req, res) => {

  // req:
  // file: {
  //   fieldname: 'image',
  //   originalname: 'wait for it.jpg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: './public/uploads/',
  //   filename: '4a37605e351109874d0c6f068058e3e3',
  //   path: 'public\\uploads\\4a37605e351109874d0c6f068058e3e3',
  //   size: 2013396
  // },

  const file = req.file;
  // console.log(file);
  // console.log(req.file.originalname);
  // const file = req.files.image;

  const fileBytes = fs.readFileSync(file.path);
  console.log(fileBytes);  // <Buffer ff d8 ff e0 00 >

  const imageName = req.file.originalname;

  postImage(req.body.idBox + imageName.slice(-4), fileBytes);  // 0121.png, 1132.png

  const postData = {
    "dataSource": "Cluster0",
    "database": "Lost-and-found-websi`te",
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
  
  // Make post request to cloud database
  axios.post('https://data.mongodb-api.com/app/data-lnnyq/endpoint/data/v1/action/insertOne', postData, { headers })
    .then(response => {
      console.log(response.data);
      res.redirect('/');  // res.sendFile(path.join(__dirname + '/public', '/home.html'));
    })
    .catch(error => {
      console.error(error);
    });  
});

app.get('/upload', ensureAuthenticated, async function(req, res) {
  // Execute any JS code that we want 
  res.sendFile(path.join(__dirname + '/public', '/upload.html'));
});

app.get('/getData', async function(req, res) {
  // let message = req.session.data.message ? req.session.data.message : '';  // return empty string if undefined
  let data = await getAllItems();
  let images = await getImages();

  // optional: check for images
  if (images === undefined) {
    res.status(400).json({error: 'No images found'})
    return;
  }

  // console.log(images);
  for (let x of data.documents) {
    x["image"] = images[x.id];
  }

  res.json(data);
  return data;
});


// Home page
app.get('/', async function(req, res) {
  if (req.session.user) {
    res.redirect('/admin');
    return;
  } 

  // Render template
  res.render(__dirname + '/public/home.html', { message: req.session.message })
  // res.sendFile(path.join(__dirname + '/public', '/home.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})

function deleteImage(name) {
  const storage = getStorage();

  const listRef = ref(storage, 'images/');  //

  listAll(listRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        let fileName = itemRef.name; 
        if (fileName.substring(0, 4) == name) {
          deleteObject(itemRef).then(() => {
            console.log("image deleted");
          }).catch((error) => {
            console.log(error);
            // TODO: Restore Firestore data that was deleted if image failed to delete
          })
        }
      });
    }).catch((error) => {
      console.log(error);
    });
}

function postImage(name, fileBytes) {
  const storage = getStorage();
  const storageRef = ref(storage, 'images/' + name);  // documents/file.png

  // Convert arrayBuffer of bytes to Uint8array which firebase can accept
  const bytes = new Uint8Array(fileBytes);

  uploadBytes(storageRef, bytes)
    .then((snapshot) => {
      console.log("Upload successful");
    }).catch((error) => {
      console.log(error);
    })
}

function getImages() {
  // Create a reference with an initial file path and name
  const storage = getStorage();
  const pathRef = ref(storage, 'images');

  // .map() example
  // let nums = [1,2,3];
  // let result = await nums.map(x => {
  //   return getData(); // the value of getData() is 5
  // });  

  // [5, 5, 5]
  // [undefined, undefined, undefined]

  let images = listAll(pathRef)
    .then(async (result) => {
      let listOfImages = await result.items.map(x => {
        return getDownloadURL(ref(storage, x._location.path_))
          .then((url) => {
            return [x._location.path.slice(7, 11), url];
          })
          .catch((error) => {
            console.log(error);
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/object-not-found':
                // File doesn't exist
                break;
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break; 
              case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;
            }
          });
      });          

      let raw = await Promise.all(listOfImages);  // 2D array
      let imageHashmap = {};
      for (let x of raw) {
        imageHashmap[x[0]] = x[1];
      }
      // TODO: convert to hashmap
      return imageHashmap
      
    })
    .catch((error) => {
      console.log(error);
      // undefined
    })

  return images;
}
