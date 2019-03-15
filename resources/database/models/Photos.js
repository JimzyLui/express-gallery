const bookshelf = require('../bookshelf');

class Photos extends bookshelf.model {
    get tableName() {return 'photos';}
    get hasTimestamps(){return false;}
}

module.exports = bookshelf.model('Photos', Photos);