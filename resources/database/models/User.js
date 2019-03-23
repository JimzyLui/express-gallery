"use strict";

const bookshelf = require("../bookshelf.js");
class User extends bookshelf.Model {
  get tableName() {
    return "users";
  }
  // get id() {
  //   return "id";
  // }
  get hasTimestamps() {
    return true;
  }
}

module.exports = bookshelf.model("User", User);
///
/*
const bookshelf = require("../bookshelf");
const User = bookshelf.Model.extend({
  tableName: "users"
});
module.exports = User;
*/

/*
const bookshelf = require("../bookshelf");
class User extends bookshelf.model {
  get tableName() {
    return "users";
  }
  get hasTimestamps() {
    return false;
  }
}
module.exports = bookshelf.model("User", User);
*/
