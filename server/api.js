'use strict'
const api = require('express').Router()
const db = require('../db')

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
// I know this because we automatically send index.html for all requests that don't make sense in our backend.
// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({ hello: 'world' }))

api.get('/campuses', (req, res) => {
	db.model('campus').findAll()
		.then(campuses => {
			res.send(campuses);
		})
})

api.get('/campuses/:id', (req, res) => {
	db.model('campus').findById(req.params.id, { include: [{ model: db.model('student') }] })
		.then(campus => {
			res.send(campus);
		})
})

api.post('/campuses/add', (req, res) => {
	db.model('campus').create({
		name: req.body.name,
		imageURL: req.body.imageURL
	})
		.then(newCampus => {
			res.send(newCampus);
		})
})

api.put('/campuses', (req, res) => {
	db.model('campus').update({
		name: req.body.name,
		imageURL: req.body.imageURL
	}, {
		where: { id: req.body.id },
		returning: true,
		plain: true
	})
	.then(response => {
		res.send(response);
	})
})

api.get('/students', (req, res) => {
	db.model('student').findAll()
		.then(student => {
			res.send(student);
		})
})

api.get('/students/:id', (req, res) => {
	db.model('student').findById(req.params.id, { include: [{ model: db.model('campus') }] })
		.then(student => {
			res.send(student);
		})
})

api.post('/students/add', (req, res) => {
	db.model('student').create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		campusId: req.body.campusId
	})
	.then(newStudent => {
		res.send(newStudent);
	})
})

api.put('/students', (req, res) => {
	db.model('student').update({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email
	}, {
		where: { id: req.body.id },
		returning: true,
		plain: true
	})
	.then(response => {
		res.send(response);
	})
})

module.exports = api
