'use strict';
const bookshelf = require('../bookshelf');
const Photo = bookshelf.Model.extend({
  tableName: 'photos',
});
module.exports = Photo;




/*
const bookshelf = require('../bookshelf');

class Photo extends bookshelf.model {
    get tableName() {return 'photos';}
    get hasTimestamps(){return false;}
}

module.exports = bookshelf.model('Photos', Photos);

*/