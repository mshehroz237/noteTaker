//using the unique id node package
const { v4: uuidv4 } = require('uuid');
//using file system to read and write files in this orogram
const fs = require('fs');
//setting up express 
const express = require('express');
// setting the instance of express to app
const app = express();
//using path to join files 
const path = require('path');
// setting the port
const PORT = process.env.PORT || 3001;
//getting the json file and setting it to a data
const data = require('./db/db.json');
//using middleware to making all files public so css and html and link
app.use(express.static('public'));
app.use(express.json());
//allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
app.use(express.urlencoded({ extended: true }));

//setting a post request
app.post('/api/notes', (req, res) => {
  //giving every object a new unique id
  req.body.id = uuidv4();
  //reading the json file
  var jsonData = fs.readFileSync('./db/db.json');
  // parsing the json data
  var myObject = JSON.parse(jsonData);
  // setting the incoming conent to neeNote
  let newNote = req.body;
  //pushing incoming conent to myObject
  myObject.push(newNote);
  //stringlifying the data
  var data2 = JSON.stringify(myObject);
  //using write file to add data and setting err method
  fs.writeFileSync('./db/db.json', data2, (err) => {
    if (err)
      throw err
  })
})

//using get request and reading the file and sending the results
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  })
})
//using  aget request and sending the files using Path to join all the linked files
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});
//setting a default page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
//checking to see if we are on right port and server is working
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});