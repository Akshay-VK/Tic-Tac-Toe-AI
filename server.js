var express = require('express');
var path = require('path');
var app = express();


var fs = require('fs');
var rawRead = fs.readFileSync('ai.json');
var  data = JSON.parse(rawRead);


var port = process.env.port || 3000;


app.use(express.static(path.join(__dirname, 'public')));


console.log(data);

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
    //var response = getValue(req.params.id);
    //console.log(req.params.id);
    if(data == {} || `${req.params.id}` in data){
        var index = Math.floor(Math.random()*9);

        //console.log(data);
        res.send({"value":index});
    }else {
        var rawData = [];
        for(var i = 0;i < 9 ;i++) {
            if(req.params.id.charAt(i) == "S") {
                for(var j = 0; j < 10;i++) {
                    rawData.push(i);
                }
            }
        }
        //console.log(rawData)
        data[req.params.id] = rawData;
        //console.log(data);

        var index = Math.floor(Math.random()*9);
        res.send({"value":index});
    }
});

// function getValue(_id) {
//     if(data.hasOwnProperty(_id)){
//         var index = Math.floor(Math.random()*9);

//         return {"status":"ok","value":index};
//     }else {
//         createNew(_id);
//     }
// }

// function createNew(_key) {
//     var key = _key;
//     //var empty = 0;
//     var rawData = [];
//     for(var i = 0;i < 9 ;i++) {
//         if(key.charAt(i) == "S") {
//             for(var j = 0; j < 50;i++) {
//                 rawData.push(i);
//             }
//         }
//     }
//     data[key] = rawData;
//     console.log(data);
//     getValue(key);
// }

app.listen(port,()=>{
    console.log(`Server started st port ${port}`);
});