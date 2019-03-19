const faker = require("faker");
const tableName = "events";

const createFakeRecord = () => ({
  eventTypeId: faker.random.number({ min: 1, max: 5 }),
  title: faker.lorem.sentence(),
  briefDesc: faker.lorem.sentences(),
  synopsis: faker.lorem.paragraph(),
  plot: faker.lorem.paragraph(),
  eventDate: faker.date.past()
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName)
    .truncate()
    .then(function() {
      const arrFakeRecords = [];
      const iDesiredFakeRecords = 150;
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
