const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;

const data = require('./db/db.json');
const { json } = require('express');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.post('/api/notes',(req, res)=>{
  req.body.id = uuidv4();
  // fs.readFile('./db/db.json', (err, results)=>{
  //   if(err){
  //     throw err;
  // }
  var jsonData = fs.readFile('./db/db.json');
  var myObject = JSON.parse(jsonData);

    // const finalResults = JSON.parse(results);
    let newNote = req.body;
    myObject.push(newNote);
    var data2 = json.stringify(myObject);

    // var newData = JSON.stringify(finalResults);
    fs.writeFile('./db/db.json',data2,(err)=>{
      if(err)
      throw err
    } )
    // console.log(newData);
  })



app.get('/api/notes',(req, res)=>{
  fs.readFile('./db/db.json', (err, results)=>{
    if(err){
      throw err;
    }
    res.send(results);
  })
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });
