const tableName = "movies";

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable(tableName, table => {
      table.increments("id").primary();
      table.integer("eventTypeId").notNullable();
      table.string("title", 150).notNullable();
      table.text("briefDesc");
      table.text("synopsis");
      table.text("plot");
      table.date("eventDate");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("modified_at").defaultTo(knex.fn.now());
    })
    .then(table => console.log(`-->Table '${tableName}' created.`));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(tableName);
};
