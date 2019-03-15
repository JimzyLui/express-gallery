
const faker = require("faker");
const tableName = 'users';

const createFakeRecord = ()=>({
  username: faker.Internet.userName(),
  nameFirst: faker.name.firstName(),
  nameLast: faker.name.lastName(),
  email: faker.Internet.email()
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
