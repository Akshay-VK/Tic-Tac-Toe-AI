var express = require('express');
var path = require('path');
var app = express();
var port = process.env.port || 3000;


app.use(express.static(path.join(__dirname, 'public')));

var data = {};

app.get('/new/:id',(req,res) => {
    var key = req.params.id;
    //var empty = 0;
    var rawData = [];
    for(var i = 0;i < 9 ;i++) {
        if(key.charAt(i) == "S") {
            for(var j = 0; j < 50;i++) {
                rawData.push(i);
            }
        }
    }
    data[key] = rawData;
    console.log(data);
    res.send({"status":"ok"});
});

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
    if(typeof data[req.params.id] == Array){
        var index = Math.floor(Math.random()*9);

        res.send({"status":"ok","value":index});
    }else {
        res.send({"status":"not found"});
    }
});

app.listen(port,()=>{
    console.log(`Server started st port ${port}`);
});