'use strict'
const api = require('express').Router()
const db = require('../db')

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'world'}))

api.get('/campuses', (req, res) => {
	db.model('campus').findAll()
	.then( campuses => {
		res.send(campuses);
	})
})

api.get('/campuses/:id', (req, res) => {
	db.model('campus').findById(req.params.id, {include: [{ model: db.model('student')}]})
	.then( campus => {
		res.send(campus);
	})
})

api.get('/students', (req, res) => {
	db.model('student').findAll()
	.then( student => {
		res.send(student);
	})
})

api.get('/students/:id', (req, res) => {
	db.model('student').findById(req.params.id, {include: [{ model: db.model('campus')}]})
	.then( student => {
		res.send(student);
	})
})

module.exports = api
