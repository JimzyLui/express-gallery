const faker = require("faker");
const tableName = "photos";

const createFakeRecord = () => ({
  userId: faker.random.number({ min: 1, max: 50 }),
  author: faker.name.findName(),
  link: faker.image.imageUrl(),
  caption: faker.company.catchPhrase(),
  description: faker.lorem.paragraph()
});

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName)
    .truncate()
    .then(function() {
      const arrFakeRecords = [];
      const iDesiredFakeRecords = 10;
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
