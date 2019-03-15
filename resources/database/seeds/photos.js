
const faker = require("faker");
const tableName = 'photos';

const createFakeRecord = ()=>({
  userId: faker.Internet.userName(),
  author: faker.name.findName(),
  link: faker.Image.imageUrl(),
  caption: faker.Company.catchPhrase(),
  description: faker.Lorem.paragraph()
});


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).truncate()
    .then(function () {
      const arrFakeRecords = [];
      const iDesiredFakeRecords = 50;
      for(let i=0; i<iDesiredFakeRecords; i++){
        arrFakeRecords.push(createFakeRecord());
      }
      console.log('createFakeUser(',iDesiredFakeRecords,'): ',arrFakeRecords.length, ' records created.');
      return knex(tableName)
      .insert(arrFakeRecords)
    }); 
};
