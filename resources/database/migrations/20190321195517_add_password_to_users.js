const tableName = "users";

exports.up = function(knex, Promise) {
  return knex.schema.table(tableName, table => {
    table.string("password").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table(tableName, table => {
    table.dropColumn("password");
  });
};
