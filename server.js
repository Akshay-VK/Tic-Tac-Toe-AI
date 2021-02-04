var express = require('express');
var path = require('path');
var app = express();


var Datastore = require('nedb');
var db = new Datastore('database.db');
db.loadDatabase();


var port = process.env.port || 3000;


app.use(express.static(path.join(__dirname, 'public')));




app.get('/update/:id/:outcome',(req,res) => {
    var outcome = req.params.outcome;
    var id = req.params.id;
    var myPositions = [];
    for(var i = 0;i < 9;i++) {
        if(id.charAt(i) == "X"){
            myPositions.push(i);
        }
    }
    if(outcome == "win") {
        for(var i = 0; i < myPositions.length;i++) {
            data[id].push(myPositions[i]);
        }
    }
    if(outcome == "lose") {
        for(var i = 0; i < myPositions.length;i++) {
            for(var j = 0; j < data[id].length;j++) {
                if(data[id][j] == myPositions[i]){
                    data[i].splice(i,1);
                    break;
                }
            }
        }
    }
    res.send({"status": "ok"})
});

app.get('/get/:id',(req,res) => {
    db.find({myId: `${req.params.id}`},(err,docs) => {
        if (docs.length == 0){
            var rawData = [];
            for(var i = 0;i < 9 ;i++) {
                if(req.params.id.charAt(i) == "S") {
                    for(var j = 0; j < 10;j++) {
                        rawData.push(i);
                    }
                }
            }
            console.log(rawData);
            db.insert({myId: req.params.id,data:rawData},(err,newDoc) => {
                //console.log(newDoc);
                var index = Math.floor(Math.random()*90);
                res.send({"value":newDoc.data[index]});
            });
        }else{
            console.log('sending...');
            var index = Math.floor(Math.random()*90);
            res.send({"value":docs[0].data[index]});
            console.log('...sent');
            
        }
    })
});

app.listen(port,()=>{
    console.log(`Server started st port ${port}`);
});