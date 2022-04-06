const express = require('express');
app = express()
app.use(express.json())    // nodig om inputdata in json te verwerken
var db = require('monk')('localhost:27017/twitter');



app.get('/tweets', (req, res) => {
    const selectie = 'naam' in req.query  ? {naam : new RegExp(req.query.naam,'i')} : {}
    const collection = db.get('tweets')
    collection.find(selectie,{} ,function(err,docs){
        if (err) { res.status(400).json({"error":err.message}); return; }
        res.header("Access-Control-Allow-Origin", "*")
        res.json(docs)
    });
})

app.options('/tweets', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
    res.json({"ok": true})
});
;


app.post('/tweets', (req, res) => {
    var collection = db.get('tweets')
    const isoString = new Date().toISOString();
    const sinds = isoString.slice(0, 10)
    console.log(req.body)
    collection.insert(req.body,{}, function (err) {
       if (err) { res.status(400).json({"error":err.message}); return; }
       res.header("Access-Control-Allow-Origin", "*")
      res.json(req.body); 
   });
})


app.listen(8081, () => {
    console.log('API online')
})