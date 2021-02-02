var express = require('express');
var path = require('path');
var app = express();
var port = process.env.port || 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port,()=>{
    console.log(`Server started st port ${port}`);
})