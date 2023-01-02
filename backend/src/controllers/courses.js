const { connection } = require("../sql/connection");
const { courseQueries } = require("../utils/functions/sqlQuerys");

const save = (req, res) => {
  let query = courseQueries.SAVE(req.body);
  connection.query(query, (error, results) => {
    if (error) throw error;
    if (results.affectedRows > 0) {
      return res.status(200).json({ status: true, results });
    }
    return res
      .status(200)
      .json({ 
        status: false, 
        error: "Ya existe el curso que desea agregar" 
      });
  });
};

const update = (req, res) => {
  let query = courseQueries.UPDATE(req.body)
  connection.query(query, (error, results) => {
    if (error) throw error;
    if (results.affectedRows > 0) {
      return res.status(200).json({ status: true, results });
    }
    return res.json({ status: false, error: `No existe el curso que desea modificar` });
  });
};

const deleteRow = (req, res) => {
  let { id } = req.body;
  let query = `DELETE FROM course WHERE id="${id}"`;

  return connection.query(query, (error, results) => {
    if (error) {
      if ((error.errno = 1451)) {
        return res.status(200).json({
          results: {
            affectedRows: 0,
            errno: 1451,
          },
        });
      }

      throw error;
    }

    return res.status(200).json({ results });
  });
};

const getAll = (req, res) => {
  let query = courseQueries.GET_ALL(req.body)
  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results });
  });
};

module.exports = { save, update, deleteRow, getAll };
