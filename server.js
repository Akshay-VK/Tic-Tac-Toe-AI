var express = require('express');
var path = require('path');
var app = express();


var Datastore = require('nedb');
var db = new Datastore('database.db');
db.loadDatabase();


var port = process.env.port || 3000;


app.use(express.static(path.join(__dirname, 'public')));




app.get('/update/:id/:move/:outcome',(req,res) => {
    var outcome = req.params.outcome;
    var id = req.params.id;
    var move = parseInt(req.params.move);   

    db.findOne({myId:`${id}`},(err,doc)=> {
        var retrievedData = doc.data;
        if(outcome == "X") {
            retrievedData.push(move);
        }
        if(outcome == "O") {
            for(var i = 0; i < retrievedData.length;i++) {
                if(retrievedData[i] == move){
                    retrievedData.splice(i,1);
                    break;
                }
            }
        }
        db.update({myId:id},{$set:{myId:id,data:retrievedData}},(error,numReplaced) => {
            console.log(`Replaced object with id : ${id} with array: ${retrievedData}`);
        });
        res.send({"SUCCESS":"SUCCESS"});
    });
});

app.get('/get/:id',(req,res) => {
    db.findOne({myId: `${req.params.id}`},(err,doc) => {
        if (doc == null){
            var rawData = [];
            for(var i = 0;i < 9 ;i++) {
                if(req.params.id.charAt(i) == "S") {
                    for(var j = 0; j < 10;j++) {
                        rawData.push(i);
                    }
                }
            }
            //console.log(rawData);
            db.insert({myId: req.params.id,data:rawData},(errs,newDoc) => {
                console.log(newDoc);
                var index1 = Math.floor(Math.random()*newDoc.data.length);
                console.log('index: '+index1);
                console.log('.data: '+newDoc.data);                
                console.log(newDoc.data[index1]);
                res.send({"value":newDoc.data[index1]});
            });
        }else{
            console.log('sending...');
            console.log(doc);
            if(doc == {}){
                console.log('empty doc found');
            }
            
            var index2 = Math.floor(Math.random()*90);
            res.send({"value":doc.data[index2]});
            console.log('...sent');
            
        }
    })
});

app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
});