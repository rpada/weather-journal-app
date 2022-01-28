// from https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1844/concepts/3bb6ade1-5c06-4690-8ade-33e070f61b67
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const projectData = []
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const server = app.listen(port, listening);

function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

// Respond with JS object when a GET request is made to the homepage
app.get('/all', function (req, res) {
  res.send(projectData)
})

// POST request
// from https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/7232b6f5-7e1b-4f5e-87f1-aa6871e29868
app.post('/addData', addData)

function addData(req,res){

    newEntry = {
    temp: req.body.temp,
    date: req.body.date,
    feelings: req.body.feelings
    }
  
    projectData.push(newEntry)
    console.log(projectData)
    res.send(projectData)
    //console.log(projectData)
  }