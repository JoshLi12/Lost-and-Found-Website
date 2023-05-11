

// TODO: store this data in a cloud database
let data = [
    {
        "id": 1234,
        "name": "n/a",
        "date": "Dec 3, 2023",
        "tags": ['blue', 'black']
    },
    {
        "id": 1235,
        "name": "n/a",
        "date": "Dec 4, 2023",
        "tags": ['blue', 'black', 'green']
    },
    {
        "id": 3423,
        "name": "n/a",
        "date": "Jan 21, 2023",
        "tags": ['red', 'speaker']
    },
    {
        "id": 1236,
        "name": "n/a",
        "date": "Dec 6, 2023",
        "tags": ['blue', 'red', 'yellow']
    }
]

/* 
   {
        "0": {
            "id": "1234",
            "name": "n/a",
            "date": "Dec 3, 2023",
            "tags": {"0": "blue", "1": "black"}
        },
        "1": {
            "id": "1235",
            "name": "n/a",
            "date": "Dec 4, 2023",
            "tags": {"0": "blue", "1": "black", "2": "green"}
        },
        "2": {
            "id": "3423",
            "name": "n/a",
            "date": "Jan 21, 2023",
            "tags": {"0": "red", "1": "speaker"}
        },
        "3": {
            "id": "1236",
            "name": "n/a",
            "date": "Dec 6, 2023",
            "tags": {"0": "blue", "1": "red", "2": "yellow"}
        }
    }

*/

/*
curl --request POST 'https://data.mongodb-api.com/app/data-lnnyq/endpoint/data/v1/action/insertOne' --header 'Content-Type: application/json' --header 'apiKey: 637ed44845955b5e97cf0b94' --data-raw '{
      "dataSource": "ClusterO",
      "database": "Lost-and-found-website",
      "collection": "items",
      "document": {
        "id": "2871",
        "name": "n/a",
        "date": "Jan 25, 2022",
        "tags": {"0": "white", "1": "pen"}
      }
  }'
*/

/*
curl --request POST \
  'https://data.mongodb-api.com/app/data-lnnyq/endpoint/data/v1/action/insertOne' \
  --header 'Content-Type: application/json' \
  --header 'apiKey: 637ed44845955b5e97cf0b94' \
  --data-raw '{
      "dataSource": "ClusterO",
      "database": "Lost-and-found-website",
      "collection": "items",
      "document": {
        "id": "2871",
        "name": "n/a",
        "date": "Jan 25, 2022",
        "tags": {"0": "white", "1": "pen"}
      }
  }'
  */

    // filter: {
//     status: 'complete',
// },
// sort: { completedAt: 1 },
// limit: 10,

// https://www.mongodb.com/community/forums/t/posting-returns-no-authentication-methods-were-specified/150523/4


// Process a list of items and render an item card for each one
function processItemCards(listOfItems) {
    let cardsSection = ""
    for (let itemInfo of listOfItems) {
        cardsSection += generateItemCard(itemInfo);  // returns HTML in string format
    }

    let container = document.getElementById("allItemCards");
    container.innerHTML = cardsSection;
}
processItemCards(data);

// Generate a single item card
function generateItemCard(itemCardInfo) {
    // Goal: return a string that looks exactly like HTML
    let id = itemCardInfo["id"];
    let date = itemCardInfo["date"];
    let name = itemCardInfo["name"];
    let tags = itemCardInfo["tags"].join(', ')

    return `
        <div class="itemCard">
            <div class="itemCardDetails">
                <div>ID: ${id}</div>
                <div>Date added: ${date}</div>
                <div>Owner name: ${name}</div>
                <div>Tags: ${tags}</div>
            </div>
        </div>
    `
}


// if (item["tags"]["blue"])
var loginState = false;

function toggleLogIn() {
    loginState = !loginState;
    console.log(loginState);
    if (loginState === true) {
        document.getElementById("pop-up-login").style.display = "block";
    }
    else {
        document.getElementById("pop-up-login").style.display = "none";
    }
}


function submitPassword() {
    let password = "password";
    let userPassword = document.getElementById("enter-password").value;
    if (userPassword == password) {
        console.log("password correct");
    } else {
        console.log("password incorrect");
    }
}