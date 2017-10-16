const db = require('../db');

const studentCount = 150;
const studentFirstNames = ['Wilbert', 'Bennie', 'Caroline', 'Nora', 'Winifred', 'Nina', 'Irvin', 'Elbert', 'Lonnie', 'Henrietta', 'Della', 'Emil', 'Imogene', 'Naomi', 'Manuel', 'Wallace', 'Wanda', 'Eva', 'Vincent', 'Baba'];
const studentLastNames = ['Smith', 'Murphy', 'Lam', 'Martin', 'Brown', 'Roy', 'Tremblay', 'Lee', 'Garcia', 'Perez', 'Romero', 'Wong', 'Tanaka', 'Mammadov', 'Singh', 'Shah', 'Ali', 'Yaga'];

const campusNames = ['Central', 'Main', 'Remote', 'Subterranean', 'Atmospheric'];
const campusImages = ['/space-doge.jpg', '/horizon.jpg', '/red-space.jpg', '/gravity-doge.gif', '/moar-space-doge.gif'];
const campusCount = campusNames.length;

let campusPromisesArr = [];

for (let i = 0; i < campusCount; i++) {
  let campusImageIndex = Math.floor(Math.random() * campusImages.length);
  let campusPromise = db.model('campus').create({
    name: campusNames[i],
    imageURL: campusImages[campusImageIndex]
  })
  campusPromisesArr.push(campusPromise);
}

Promise.all(campusPromisesArr)
.then( result => {
  for (let i = 0; i < studentCount; i++) {
    let firstName = studentFirstNames[Math.floor(Math.random() * studentFirstNames.length)];
    let lastName = studentLastNames[Math.floor(Math.random() * studentLastNames.length)];
    let email = (firstName[0] + '.' + lastName + '@example.com').toLowerCase();
    let campusId = result[Math.floor(Math.random() * campusNames.length)].id
    db.model('student').create({
      firstName,
      lastName,
      email,
      campusId
    })
  }
})
