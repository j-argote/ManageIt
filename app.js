// server
var express = require('express');
var app = express();

// set the view engine to ejs & set views to view folder
app.set('view engine', 'ejs');
app.set('views', 'views');

// set public folder & include routes
app.use(express.static('public'));
app.use(require('./routes/index'));






app.listen(3000,()=>{
    console.log('listening on port 3000')
})

