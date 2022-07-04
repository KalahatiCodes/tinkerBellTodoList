// CRUD
// Create: new todos from the input (post)
// Read: (get) our files? Database
// Update/Change: (put) cross out our list items that have been done 
// Delete: delete items from our list and db

var cors = require('cors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://kalahati:Qr4q9FNmhGtBc8Od@listitems.pvnup.mongodb.net/todoList?retryWrites=true&w=majority";
const dbName = "todoList";

app.listen(4141, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log( dbName + " live on " + "4141!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/todo', (req, res) => {
  db.collection('listItems').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('todo.ejs', {listItems: result})
  })
})

app.get('/', function(req, res) {
  res.render('home.ejs');
});

app.get('/reflection', function(req, res) {
  res.render('reflection.ejs');
});

app.post('/listItems', (req, res) => {
  db.collection('listItems').insertOne({msg:req.body.msg, dayTally: 0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/todo')
  })
})

app.put('/daysTally', (req, res) => {
  console.log(req.body);
  db.collection('listItems')
  .findOneAndUpdate({msg:req.body.msg}, {
    $set: {
      dayTally:req.body.likes + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})


app.delete('/listItems', (req, res) => {
  db.collection('listItems').findOneAndDelete({msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('listItem deleted!')
  })
})





