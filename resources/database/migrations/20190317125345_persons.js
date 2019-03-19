const tableName = "persons";

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable(tableName, table => {
      table.increments("id").primary();
      table.string("nameFirst", 100).notNullable();
      table.string("nameLast", 100).notNullable();
      table.date("dateOfBirth");
      table.date("dateOfDeath");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("modified_at").defaultTo(knex.fn.now());
    })
    .then(table => console.log(`-->Table '${tableName}' created.`));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(tableName);
};
