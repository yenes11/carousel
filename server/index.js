const express = require('express');
const app = express();
const PORT = 3001;
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get("/api/playlist", (req, res) => {
    res.json({"playlist": playlist})
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
        url: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        duration: 1,
    },
    {
        name: "TWO",
        type: "image",
        url: "https://images.pexels.com/photos/34299/herbs-flavoring-seasoning-cooking.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        duration: 3,
    },
    {
        name: "THREE",
        type: "image",
        url: "https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        duration: 1,
    },
    {
        name: "FOUR",
        type: "image",
        url: "https://images.pexels.com/photos/4040649/pexels-photo-4040649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        duration: 3,
    },
];

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})