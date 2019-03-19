const faker = require("faker");
const tableName = "users";

const createFakeRecord = () => ({
  nameFirst: faker.name.firstName(),
  nameLast: faker.name.lastName(),
  username: faker.internet.userName(),
  email: faker.internet.email()
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName)
    .truncate()
    .then(function() {
      const arrFakeRecords = [];
      const iDesiredFakeRecords = 50;
      for (let i = 0; i < iDesiredFakeRecords; i++) {
        arrFakeRecords.push(createFakeRecord());
      }
      console.log(
        tableName,
        ": createRecords(",
        iDesiredFakeRecords,
        "): ",
        arrFakeRecords.length,
        " records created."
      );
      return knex(tableName).insert(arrFakeRecords);
    });
};
