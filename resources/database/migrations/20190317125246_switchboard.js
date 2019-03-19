const tableName = "switchboard";

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable(tableName, table => {
      table.increments("id").primary();
      table.integer("personId").notNullable();
      table.string("tableName").notNullable();
      table.integer("tableId").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("modified_at").defaultTo(knex.fn.now());
    })
    .then(table => console.log(`-->Table '${tableName}' created.`));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(tableName);
};
