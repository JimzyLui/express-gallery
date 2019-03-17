const tableName = "movies";

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable(tableName, table => {
      table.increments("id").primary();
      table.string("title", 150).notNullable();
      table.string("briefDesc", 100);
      table.text("synopsis");
      table.text("plot");
      table.date("airdate");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("modified_at").defaultTo(knex.fn.now());
    })
    .then(table => console.log(`-->Table '${tableName}' created.`));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(tableName);
};
