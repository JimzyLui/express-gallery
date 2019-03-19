const faker = require("faker");
const tableName = "relationships";

const createFakeRecord = () => ({
  personId: faker.random.number({ min: 1, max: 50 }),
  personId2: faker.random.number({ min: 1, max: 50 }),
  relationshipId: faker.random.number({ min: 1, max: 10 })
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName)
    .truncate()
    .then(function() {
      const arrFakeRecords = [];
      const iDesiredFakeRecords = 100;
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
