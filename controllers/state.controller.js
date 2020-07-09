const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");
const connect = require("../config/connectMySQL");

// read states
function read(req, res) {
  const query = connect.con.query(
    "SELECT state_id, name FROM state ORDER BY name ASC",
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res
          .status(jsonMessages.db.dbError.status)
          .send(jsonMessages.db.dbError);
      } else {
        if (rows.length == 0) {
          res
            .status(jsonMessages.db.noRecords.status)
            .send(jsonMessages.db.noRecords);
        } else {
          res.send(rows);
        }
      }
    }
  );
}

// read state with id x
function readID(req, res) {
  const state_id = req.sanitize("id").escape();
  const query = connect.con.query(
    "SELECT state_id, name FROM state where state_id = ? ",
    state_id,
    function (err, rows, fields) {
      console.log(query.sql);
      if (err) {
        console.log(err);
        res
          .status(jsonMessages.db.dbError.status)
          .send(jsonMessages.db.dbError);
      } else {
        if (rows.length == 0) {
          res
            .status(jsonMessages.db.noRecords.status)
            .send(jsonMessages.db.noRecords);
        } else {
          res.send(rows);
        }
      }
    }
  );
}

// create state
function create(req, res) {
  const name = req.sanitize("name").escape();
  req.checkBody("name", "Insira apenas texto").matches(/^[a-z ]+$/i);
  const errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  } else {
    if (name != "NULL" && typeof name != "undefined") {
      const sqlvalues = {
        name: name,
      };
      const query = connect.con.query(
        "INSERT INTO state SET ?",
        sqlvalues,
        function (err, rows, fields) {
          console.log(query.sql);
          if (!err) {
            res
              .status(jsonMessages.db.successInsert.status)
              .location(rows.insertId)
              .send(jsonMessages.db.successInsert);
          } else {
            console.log(err);
            res
              .status(jsonMessages.db.dbError.status)
              .send(jsonMessages.db.dbError);
          }
        }
      );
    } else
      res
        .status(jsonMessages.db.requiredData.status)
        .send(jsonMessages.db.requiredData);
  }
}

// update state
function update(req, res) {
  const state_id = req.sanitize("id").escape();
  const name = req.sanitize("name").escape();
  req.checkBody("name", "Insira apenas texto").matches(/^[a-z ]+$/i);
  const errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  } else {
    if (
      state_id != "NULL" &&
      typeof name != "undefined" &&
      typeof state_id != "undefined"
    ) {
      const sqlvalues = [name, state_id];
      const query = connect.con.query(
        "UPDATE state SET name=? WHERE state_id=?",
        sqlvalues,
        function (err, rows, fields) {
          console.log(query.sql);
          if (!err) {
            res
              .status(jsonMessages.db.successUpdate.status)
              .send(jsonMessages.db.successUpdate);
          } else {
            console.log(err);
            res
              .status(jsonMessages.db.dbError.status)
              .send(jsonMessages.db.dbError);
          }
        }
      );
    } else
      res
        .status(jsonMessages.db.requiredData.status)
        .send(jsonMessages.db.requiredData);
  }
}

//delete state
function deleteF(req, res) {
  const state_id = req.sanitize("id").escape();
  const query = connect.con.query(
    "DELETE FROM state WHERE state_id=?",
    state_id,
    function (err, rows, fields) {
      console.log(query.sql);
      if (!err) {
        res
          .status(jsonMessages.db.successDelete.status)
          .send(jsonMessages.db.successDelete);
      } else {
        console.log(err);
        res
          .status(jsonMessages.db.dbError.status)
          .send(jsonMessages.db.dbError);
      }
    }
  );
}

module.exports = {
  read: read,
  readID: readID,
  create: create,
  update: update,
  deleteF: deleteF,
};
