const express = require('express');
const app = express();
const port = 1955;
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get("/api/playlist", (req, res) => {
    res.json({"data": playlist})
});


app.post('/api/add', (req, res) => {
    console.log(req.body);
    res.status(201).send(req.body); 
    playlist.push(req.body);
  });

let playlist = [
    {
        name: "ONE",
        type: "image",
        url: "https://picsum.photos/300/300?random=4",
        duration: 3,
    },
    {
        name: "TWO",
        type: "image",
        url: "https://picsum.photos/300/300?random=1",
        duration: 1,
    },
    {
        name: "THREE",
        type: "image",
        url: "https://picsum.photos/300/300?random=2",
        duration: 3,
    },
    {
        name: "FOUR",
        type: "image",
        url: "https://picsum.photos/300/300?random=3",
        duration: 1,
    },
];

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})