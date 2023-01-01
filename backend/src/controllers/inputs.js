const { connection } = require("../sql/connection");
const { generateInsertSQL } = require("../utils/functions/generateMultiQuery");
const { inputsQueries } = require("../utils/functions/sqlQuerys");

const save = (req, res) => {
  let {
    type,
    course_id,
    subject,
    date,
    partial,
    quimestre,
    description
  } = req.body;

  let query = inputsQueries.SAVE(
    type,
    course_id,
    date,
    subject,
    description,
    partial,
    quimestre
  );

  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ data: results, status: true });
  });
};

const update = (req, res) => {};

const deleteRow = (req, res) => {};

const getAll = (req, res) => {
  let query = "SELECT * FROM input_type";
  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results });
  });
};

const getOne = (req, res) => {
  let { course_id, quimestre, partial, subject } = req.body;
  let query = `SELECT * FROM input 
  WHERE 
    course_id= "${course_id}" AND
    quimestre= "${quimestre}" AND
    partial= "${partial}" AND
    subject= "${subject}"
  `;

  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results });
  });
};

const foundMany = (req, res) => {
  const { type, quimestre, partial, subject, course_id } = req.body;

  let query = `SELECT 
    input.id,
    input.date,
    input.description,
    input.subject,
    input.type,
    input.partial,
    input.quimestre,
    level.name AS level_name,
    parallel.name AS parallel_name,
    period.year AS year,
    input_type.name AS input_name,
    quimestre.name AS quimestre_name,
    partial.name AS partial_name
  FROM input 
    INNER JOIN course
    ON course.id = input.course_id 
    INNER JOIN level
    ON level.id = course.level 
    INNER JOIN parallel
    ON parallel.id = course.parallel
    INNER JOIN period
    ON period.id = course.period 
    INNER JOIN input_type
    ON input_type.id = input.type
    INNER JOIN quimestre
    ON quimestre.id = input.quimestre
    INNER JOIN partial
    ON partial.id = input.partial
  WHERE 
  type= "${type}" AND 
  subject= "${subject}" AND 
  partial= "${partial}" AND 
  quimestre= "${quimestre}" AND 
  course_id= "${course_id}"`;

  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results });
  });
};

module.exports = { save, update, deleteRow, getAll, getOne, foundMany };
