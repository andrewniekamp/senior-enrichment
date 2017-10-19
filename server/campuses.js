const router = require('express').Router();
const db = require('../db');

router.get('/', (req, res) => {
	db.model('campus').findAll()
		.then(campuses => {
			res.send(campuses);
		})
})

router.put('/', (req, res) => {
	db.model('campus').findById(req.body.id)
		.then(campusToUpdate => {
			campusToUpdate.update({
				name: req.body.name,
				imageURL: req.body.imageURL,
			}, {
					returning: true,
					plain: true
				})
				.then(response => {
					res.send(response);
				})
		})
})

router.get('/:id', (req, res) => {
	db.model('campus').findById(req.params.id, { include: [{ model: db.model('student') }] })
		.then(campus => {
			res.send(campus);
		})
})

router.post('/add', (req, res) => {
	db.model('campus').create({
		name: req.body.name,
		imageURL: req.body.imageURL
	})
		.then(newCampus => {
			res.send(newCampus);
		})
})

router.delete('/:id', (req, res) => {
	db.model('campus').findById(req.params.id)
		.then(campus => {
			campus.destroy()
			res.json(campus);
		})
})

module.exports = router;
