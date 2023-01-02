const { connection } = require("../sql/connection");
const { inputsQueries } = require("../utils/functions/sqlQuerys");

const save = (req, res) => {
  console.log(req.body);
  let query = inputsQueries.SAVE(req.body);
  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ data: results, status: true });
  });
};

const update = (req, res) => {};

const deleteRow = (req, res) => {
  let query = inputsQueries.DELETE(req.body);
  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results });
  });
};

const getAll = (req, res) => {
  let query = inputsQueries.GET_TYPES();
  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results });
  });
};

const getOne = (req, res) => {
  let query = inputsQueries.GET_ONE(req.body);
  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results });
  });
};

const foundMany = (req, res) => {
  let query = inputsQueries.FOUND_MANY(req.body);

  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results });
  });
};

module.exports = { save, update, deleteRow, getAll, getOne, foundMany };
