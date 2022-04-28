const express = require('express')
const req = require('express/lib/request')

const model = require('./model')

const server = express()

server.use(express.json())

server.get("/", (req,res) => {
    res.status(200).json({ api: "up and running señor"})
})

server.get('/crossfitters', (req,res) => {
    model.getAll()
    .then(cfr => {
        res.json(cfr)
    })
})

server.get('/crossfitters/:id', (req,res, next) => {
    model.getById(req.params.id)
    .then(cfr => {
        res.json(cfr)
    })
    .catch(err => {
        next(err)
    })
})

server.post('/crossfitters', (req,res, next) => {
    model.insert(req.body)
    .then(cfr => {
        res.json(cfr)
    })
    .catch(err => {
        next(err)
    })
})

server.route('/crossfitters/:id', (req,res) => {
    res.json('hey you updated me')
})

server.delete('/crossfitters/:id', (req,res) => {
    res.json('you mastered it')
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = server