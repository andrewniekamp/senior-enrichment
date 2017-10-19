const db = require('./db');
const faker = require('faker');

const studentCount = 150;

const campusNames = ['Central', 'Main', 'Remote', 'Subterranean', 'Atmospheric'];
const campusImages = ['/space-doge.jpg', '/horizon.jpg', '/red-space.jpg', '/moar-space-doge.gif', '/gravity-doge.gif'];
const campusCount = campusNames.length;

let campusPromisesArr = [];

for (let i = 0; i < campusCount; i++) {
  let campusPromise = db.model('campus').create({
    name: campusNames[i],
    imageURL: campusImages[i]
  })
  campusPromisesArr.push(campusPromise);
}

Promise.all(campusPromisesArr)
.then( result => {
  for (let i = 0; i < studentCount; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();
    let campusId = result[Math.floor(Math.random() * campusNames.length)].id
    db.model('student').create({
      firstName,
      lastName,
      email,
      campusId
    })
  }
})
