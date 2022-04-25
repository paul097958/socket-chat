const express = require('express')
const app = express()
const path = require('path')

app.get('/', (req, res) => {
    res.sendFile('./src/index.html')
})


app.get('/index.js', (req, res) => {
    res.sendFile('./src/index.js')
})


app.get('/index.css', (req, res) => {
    res.sendFile('./src/index.css')
})

const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


let online = 0;
let db = []

io.on('connection', client => {
    online++
    console.log(online, 'people online');
    io.emit('sendOnlinePeople', online);
    io.emit('reloadText', db)
    client.on('newText', data => {
        console.log('Some one say:', data);
        db.unshift(data)
        io.emit('reloadText', db)
    })
    client.on('disconnect', () => {
        online--
        console.log(online, 'people online');
        io.emit('sendOnlinePeople', online)
    });
});


io.listen(8000);

app.listen(3000);