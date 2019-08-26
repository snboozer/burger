var connection = require("./connection.js");

var tableName = "burgers";

var orm = {

  burgers: function(callback) {
    var s = "SELECT * FROM " + tableName;

    connection.query(s, function(err, result) {
      callback(result);
    });
  },

  addBurger: function(burgers, callback) {
   
    var routeName = burgers.name.replace(/\s+/g, "").toLowerCase();
    console.log(routeName);

    var s = "INSERT INTO " + tableName + " (burger) VALUES (?)";

    connection.query(s, [routeName, burgers.name], function(
      err,
      result
    ) {
      callback(result);
    });
  }
};

module.exports = orm;
