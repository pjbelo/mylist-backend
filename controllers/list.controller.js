const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");
const connect = require("../config/connectMySQL");

// read list
function read(req, res) {
  const query = connect.con.query(
    "SELECT list_id, product_id, state_id FROM list ORDER BY list_id DESC",
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

// read list with names from products and state
function read2(req, res) {
  sqlquery =
    "SELECT list.list_id, list.product_id, product.name, product.photo, product.description, " +
    "product.alternatives, product.category_id, category.name AS category_name, list.state_id, state.name AS state_name " +
    "FROM list " +
    "LEFT JOIN product ON list.product_id = product.product_id " +
    "LEFT JOIN state ON list.state_id = state.state_id " +
    "LEFT JOIN category ON product.category_id = category.category_id " +
    "ORDER BY list_id DESC";
  const query = connect.con.query(sqlquery, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
    } else {
      if (rows.length == 0) {
        res
          .status(jsonMessages.db.noRecords.status)
          .send(jsonMessages.db.noRecords);
      } else {
        res.send(rows);
      }
    }
  });
}

// read list item with id x
function readID(req, res) {
  const list_id = req.sanitize("id").escape();
  const query = connect.con.query(
    "SELECT list_id, product_id, state_id FROM list WHERE list_id = ? ",
    list_id,
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

// read list item with id x with names from products and state
function readID2(req, res) {
  const list_id = req.sanitize("id").escape();
  sqlquery =
    "SELECT list.list_id, list.product_id, product.name, product.photo, product.description, " +
    "product.alternatives, product.category_id, category.name AS category_name, list.state_id, state.name AS state_name " +
    "FROM list " +
    "LEFT JOIN product ON list.product_id = product.product_id " +
    "LEFT JOIN state ON list.state_id = state.state_id " +
    "LEFT JOIN category ON product.category_id = category.category_id " +
    "WHERE list_id = ?";
  const query = connect.con.query(sqlquery, list_id, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
    } else {
      if (rows.length == 0) {
        res
          .status(jsonMessages.db.noRecords.status)
          .send(jsonMessages.db.noRecords);
      } else {
        res.send(rows);
      }
    }
  });
}


// create list item
function create(req, res) {
  const product_id = req.sanitize("product_id").escape();
  const state_id = req.sanitize("state_id").escape();
  req.checkBody("product_id", "product_id é obrigatório").isInt();
  req.checkBody("state_id", "state_id é obrigatório").isInt();
  const errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  } else {
    if (product_id != "NULL" && typeof product_id != "undefined") {
      const sqlvalues = {
        product_id: product_id,
        state_id: state_id,
      };
      const query = connect.con.query(
        "INSERT INTO list SET ?",
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

// update list item
function update(req, res) {
  const list_id = req.sanitize("id").escape();
  const product_id = req.sanitize("product_id").escape();
  const state_id = req.sanitize("state_id").escape();
  req.checkBody("product_id", "product_id é obrigatório").isInt();
  req.checkBody("state_id", "state_id é obrigatório").isInt();
  const errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  } else {
    if (
      product_id != "NULL" &&
      typeof product_id != "undefined" &&
      typeof state_id != "undefined"
    ) {
      const sqlvalues = [product_id, state_id, list_id];
      const query = connect.con.query(
        "UPDATE list SET product_id=?, state_id=? WHERE list_id=?",
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

//delete list item
function deleteF(req, res) {
  const list_id = req.sanitize("id").escape();
  const query = connect.con.query(
    "DELETE FROM list WHERE list_id=?",
    list_id,
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
  read2: read2,
  readID: readID,
  readID2: readID2,
  create: create,
  update: update,
  deleteF: deleteF,
};
