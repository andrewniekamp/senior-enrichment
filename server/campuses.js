const router = require('express').Router();
const db = require('../db');

router.get('/', (req, res, next) => {
	db.model('campus').findAll()
		.then(campuses => {
			res.send(campuses);
    })
    .catch(next);
})

router.put('/', (req, res, next) => {
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
    .catch(next);
})

router.get('/:id', (req, res, next) => {
	db.model('campus').findById(req.params.id, { include: [{ model: db.model('student') }] })
		.then(campus => {
			res.send(campus);
    })
    .catch(next);
})

router.post('/add', (req, res, next) => {
	db.model('campus').create({
		name: req.body.name,
		imageURL: req.body.imageURL
	})
		.then(newCampus => {
			res.send(newCampus);
    })
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
	db.model('campus').findById(req.params.id)
		.then(campus => {
			campus.destroy()
			res.json(campus);
    })
    .catch(next);
})

module.exports = router;
