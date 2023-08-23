// TODO: store this data in a cloud database
/*
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
    },
    {
        "id": 1236,
        "name": "n/a",
        "date": "Dec 6, 2023",
        "tags": ['blue', 'red', 'yellow']
    },
    {
        "id": 1236,
        "name": "n/a",
        "date": "Dec 6, 2023",
        "tags": ['blue', 'red', 'yellow']
    },
    {
        "id": 1236,
        "name": "n/a",
        "date": "Dec 6, 2023",
        "tags": ['blue', 'red', 'yellow']
    },
    {
        "id": 1236,
        "name": "n/a",
        "date": "Dec 6, 2023",
        "tags": ['blue', 'red', 'yellow']
    },
    {
        "id": 1236,
        "name": "n/a",
        "date": "Dec 6, 2023",
        "tags": ['blue', 'red', 'yellow']
    },
    {
        "id": 1236,
        "name": "n/a",
        "date": "Dec 6, 2023",
        "tags": ['blue', 'red', 'yellow']
    },
    {
        "id": 1236,
        "name": "n/a",
        "date": "Dec 6, 2023",
        "tags": ['blue', 'red', 'yellow']
    }
]/*

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
    let cardsSection = "";
    for (let i=listOfItems.length-1; i>=0; i--) {
        cardsSection += generateItemCard(listOfItems[i]);  // returns HTML in string format
    }

    let container = document.getElementById("allItemCards");
    container.innerHTML = cardsSection;  
}

// Process a list of items and render an item card for each one
function processItemCardsAdmin(listOfItems) {
    let cardsSection = "";
    for (let i=listOfItems.length-1; i>=0; i--) {
        cardsSection += generateItemCardAdmin(listOfItems[i]);  // returns HTML in string format
    }

    let container = document.getElementById("allItemCards");
    container.innerHTML = cardsSection;  
}

// Generate a single item card
function generateItemCard(itemCardInfo) {
    let id = itemCardInfo["id"];
    let date = itemCardInfo["date"];
    let name = itemCardInfo["name"];
    let image = itemCardInfo["image"];

    return `
        <div class="itemCard" id="${id}" style="background-image: url(${image})">
            <div class="itemCardBackgroundColor">
                <div class="itemCardDetails">
                    <div class="itemCardDetailsText">ID: ${id}</div>
                    <div class="itemCardDetailsText">Date added: ${date}</div>
                    <div class="itemCardDetailsText">Owner name: ${name}</div>
                </div>
            </div>
        </div>
    `
}

// Generate a single item card
function generateItemCardAdmin(itemCardInfo) {
    let id = itemCardInfo["id"];
    let date = itemCardInfo["date"];
    let name = itemCardInfo["name"];
    let image = itemCardInfo["image"];

    return `
        <div class="itemCard" id="${id}" style="background-image: url(${image})">
            <div id="itemCardBackground" class="itemCardBackgroundColor" onmouseleave="resetInfo(${id})" onclick="claim(${id})">
                <div class="itemCardDetails" id="itemCardDetails${id}">
                    <div class="itemCardDetailsText">ID: ${id}</div>
                    <div class="itemCardDetailsText">Date Added: ${date}</div>
                    <div class="itemCardDetailsText">Owner Name: ${name}</div>
                </div>
                
                <p class="claimButton" id="claimButton${id}" onclick="removeInfo(${id})>Claim</p>
            </div>
        </div>
    `
}

function resetInfo(id) {
    console.log("test");
    document.getElementById("claimButton" + id).style.display = "none";
    document.getElementById("itemCardDetails" + id).style.display = "block";
}

function claim(id) {
    console.log("Clicked,", id);
    document.getElementById("claimButton" + id).style.display = "block";
    document.getElementById("itemCardDetails" + id).style.display = "none";
}

function removeInfo(id) {
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(data), // Convert the data to JSON format
      };
      
    fetch('/deleteInfo')
        .then(response => response.json())
        .catch(error => {
        console.error('Error:', error);
        });
}

// if (item["tags"]["blue"])
var loginState = false;

function toggleLogIn() {
    loginState = !loginState;
    console.log(loginState);
    if (loginState === true) {
        document.getElementById("pop-up-login").style.display = "inline";
        document.getElementById("login").style.display = "none";
    }
}

// Prevent page refresh when clicking submit
// document.getElementById("loginForm").addEventListener("submit", function(event){
//     event.preventDefault()
// });

function submitPassword() {
    // let password = "password";
    let userPassword = document.getElementById("enter-password").value;
    
    // Server side example: Check if login is valid
    api.post('/login', password);

    // Client side example
    // if (loggedIn) {
    //     console.log("password correct");
    //     document.getElementById("login").style.display = "none";
    //     document.getElementById("logout").style.display = "block";

    //     //renderAdminButtons();
    // } else {
    //     console.log("password incorrect");
    // }
}