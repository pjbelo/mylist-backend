const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");
const connect = require("../config/connectMySQL");

// read products
function read(req, res) {
  const query = connect.con.query(
    "SELECT category_id, product_id, name, photo, description, alternatives FROM product ORDER BY category_id, name ASC",
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

// read product with id x
function readID(req, res) {
  const product_id = req.sanitize("id").escape();
  const query = connect.con.query(
    "SELECT product_id, name, photo, description, alternatives, category_id FROM product WHERE product_id = ? ",
    product_id,
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

// create product
function create(req, res) {
  const name = req.sanitize("name").escape();
  const photo = req.sanitize("photo").escape();
  const description = req.sanitize("description").escape();
  const alternatives = req.sanitize("alternatives").escape();
  const category_id = req.sanitize("category_id").escape();
  req.checkBody("name", "Insira um nome").notEmpty();
  req.checkBody("category_id", "category_id é obrigatório").isInt();
  const errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  } else {
    if (name != "NULL" && typeof name != "undefined") {
      const sqlvalues = {
        name: name,
        photo: photo,
        description: description,
        alternatives: alternatives,
        category_id: category_id,
      };
      const query = connect.con.query(
        "INSERT INTO product SET ?",
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

// update product
function update(req, res) {
  const product_id = req.sanitize("id").escape();
  const name = req.sanitize("name").escape();
  const photo = req.sanitize("photo").escape();
  const description = req.sanitize("description").escape();
  const alternatives = req.sanitize("alternatives").escape();
  const category_id = req.sanitize("category_id").escape();
  req.checkBody("name", "Insira um nome").notEmpty();
  req.checkBody("category_id", "category_id é obrigatório").isInt();
  const errors = req.validationErrors();
  if (errors) {
    res.send(errors);
    return;
  } else {
    if (
      category_id != "NULL" &&
      typeof name != "undefined" &&
      typeof category_id != "undefined"
    ) {
      const sqlvalues = [name, photo, description, alternatives, category_id, product_id];
      const query = connect.con.query(
        "UPDATE product SET name=?, photo=?, description=?, alternatives=?, category_id=? WHERE product_id=?",
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

//delete product
function deleteF(req, res) {
  const product_id = req.sanitize("id").escape();
  const query = connect.con.query(
    "DELETE FROM product WHERE product_id=?",
    product_id,
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
