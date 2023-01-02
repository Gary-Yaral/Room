const { connection } = require("../sql/connection");
const { studentQueries } = require("../utils/functions/sqlQuerys");

const save = (req, res) => {
  let query = studentQueries.SAVE(req.body);

  connection.query(query, (error, results) => {
    if (error) throw error;
    if (results.affectedRows > 0) {
      return res.status(200).json({ status: true, results });
    };
  
    return res
      .status(200)
      .json({
        status: false,
        error: `Ya existe un estudiantes registrado con la cédula ${dni}`,
      });
  });
};

const update = (req, res) => {
  let { id, level, parallel, period, speciality } = req.body;

  let query = `
  SELECT * FROM course
    WHERE 
      level = "${level}" AND
      period = "${period}" AND
      parallel = "${parallel}"`;

  connection.query(query, (error, results) => {
    if (error) throw error;
    if (results.length > 0 && results[0].id !== id) {
      return res.json({ status: false, error: `Este curso ya existe` });
    }

    let values = `"${level}","${parallel}", "${speciality}", "${period}"`;
    query = `UPDATE course 
      SET 
        level="${level}", 
        parallel="${parallel}", 
        speciality="${speciality}", 
        period="${period}" 
      WHERE id ="${id}"`;

    connection.query(query, (error, results) => {
      if (error) throw error;
      return res.status(200).json({ status: true, results });
    });
  });
};

const deleteRow = (req, res) => {
  let { id } = req.body;
  let query = `DELETE FROM student WHERE id="${id}"`;

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
  let { course_id } = req.body;

  let query = `SELECT
    student.id, 
    student.dni,
    student.name,
    student.lastname,
    student.course_id,
    level.name AS level,
    parallel.name AS parallel,
    period.year
  FROM student 
    INNER JOIN course
    ON course.id = student.course_id
    INNER JOIN period
    ON period.id = course.period
    INNER JOIN level
    ON course.level = level.id
    INNER JOIN parallel
    ON course.parallel = parallel.id
  WHERE course_id="${course_id}"`;

  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results });
  });
};

const getList = (req, res) => {
  let { course_id } = req.body;

  let query = `SELECT * FROM student WHERE course_id="${course_id}"`;

  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results });
  });
};

const getOne = (req, res) => {
  let { id } = req.body;
  let query = `SELECT * FROM school WHERE id= "${id}"`;

  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results });
  });
};

module.exports = { save, update, deleteRow, getAll, getOne, getList };
