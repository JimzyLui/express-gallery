const faker = require("faker");
const tableName = "countries";

const createFakeRecord = () => ({
  countryName: faker.address.country()
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
