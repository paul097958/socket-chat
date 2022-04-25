const express = require('express')
const app = express()
const path = require('path')

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./src/index.html'))
})


app.get('/index.js', (req, res) => {
    res.sendFile(path.resolve('./src/index.js'))
})


app.get('/index.css', (req, res) => {
    res.sendFile(path.resolve('./src/index.css'))
})


app.listen(3000);