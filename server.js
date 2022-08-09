const express = require('express');
const app = express();

console.log('may node be with you!');

app.listen(3000, () => console.log(`listening on port 3000`));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})



app.post('/quotes',(req,rest)=>{
    console.log(`Response received on '/quotes'`)
})