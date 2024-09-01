# City Explorer Learning Project

## Initialization
---
db.places.find()

---
db.places.insertOne({name: 'Central Park', city: 'New York', type: 'Park'})
{
  acknowledged: true,
  insertedId: ObjectId('66d4a106191211decd2710bd')
}
---
db.places.find()

---
db.places.insertMany([{name: 'Eiffel Tower', city: 'Paris', type: 'Monument', year_built: 1889, timestamp: new Date()}, {name: 'Great Wall of China', city: 'Beijing', type: 'Historical Site', year_built: -700, timestamp: new Date()}, {name: 'Sydney Opera House', city: 'Sydney', type: 'Theater', year_built: 1973, timestamp: new Date()}])

---
db.places.find({city: 'Paris'})

---
db.places.find({type: 'Monument'})

---
db.places.find({year_build: {$lt: 1889}})

---
db.places.find({ year_built: { $gt: 1600, $lt: 1900 } })