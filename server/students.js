const router = require('express').Router();
const db = require('../db');

router.get('/', (req, res) => {
	db.model('student').findAll()
		.then(student => {
			res.send(student);
		})
})

router.put('/', (req, res) => {
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
    })
})

router.get('/:id', (req, res) => {
	db.model('student').findById(req.params.id, { include: [{ model: db.model('campus') }] })
		.then(student => {
			res.send(student);
		})
})

router.post('/add', (req, res) => {
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

router.delete('/:id', (req, res) => {
	db.model('student').findById(req.params.id)
		.then(student => {
			student.destroy()
			res.json(student);
		})
})

module.exports = router;
