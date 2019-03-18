'use strict';
const bookshelf = require('../bookshelf');
const User = bookshelf.Model.extend({
  tableName: 'users',
});
module.exports = User;

/*
const bookshelf = require('../bookshelf');

class User extends bookshelf.model {
    get tableName() {return 'users';}
    get hasTimestamps(){return false;}
}

module.exports = bookshelf.model('Users', Users);

*/