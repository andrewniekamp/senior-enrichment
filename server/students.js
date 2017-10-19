const router = require('express').Router();
const db = require('../db');

router.get('/', (req, res, next) => {
	db.model('student').findAll()
		.then(student => {
			res.send(student);
    })
    .catch(next);
})

router.put('/', (req, res, next) => {
  db.model('student').findById(req.body.id)
    .then(studentToUpdate => {
      console.log(studentToUpdate)
      studentToUpdate.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        campusId: req.body.campusId,
        email: req.body.email
      }, {
          returning: true,
          plain: true
        })
        .then(response => {
          res.send(response);
        })
        .catch(next);
    })
    .catch(next);
})

router.get('/:id', (req, res, next) => {
	db.model('student').findById(req.params.id, { include: [{ model: db.model('campus') }] })
		.then(student => {
			res.send(student);
    })
    .catch(next);
})

router.post('/add', (req, res, next) => {
	db.model('student').create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		campusId: req.body.campusId
	})
		.then(newStudent => {
			res.send(newStudent);
    })
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
	db.model('student').findById(req.params.id)
		.then(student => {
			student.destroy()
			res.json(student);
    })
    .catch(next);
})

module.exports = router;
