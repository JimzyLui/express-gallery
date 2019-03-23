const tableName = "users";

exports.up = function(knex, Promise) {
  return knex.schema.table(tableName, table => {
    table.renameColumn("password", "hashedPassword");
    table.string("salt");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table(tableName, table => {
    table.renameColumn("hashedPassword", "password");
    table.dropColumn("salt");
  });
};
