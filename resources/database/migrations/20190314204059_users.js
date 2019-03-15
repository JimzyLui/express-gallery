const tableName = 'users';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('username',150).notNullable();
    table.string('nameFirst',100);
    table.string('nameLast',100);
    table.string('email',100);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('modified_at').defaultTo(knex.fn.now());
  }).then((table)=>
    console.log(`-->Table '${tableName}' created.`)
  );
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(tableName);
};
