const { connection } = require("../sql/connection");

const save = (req, res) => {
  let { level, parallel, period, speciality } = req.body;
 
  let query = `
  SELECT * FROM course
    WHERE 
      level = "${level}" AND
      period = "${period}" AND
      parallel = "${parallel}"`;

  connection.query(query, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      return res.json({ status: false, error: `Este curso ya existe` });
    }

    let values = `"${level}","${parallel}", "${speciality}", "${period}"`;
    query = `INSERT INTO course(level, parallel, speciality, period) VALUES(${values})`;

    connection.query(query, (error, results) => {
      if (error) throw error;
      return res.status(200).json({ status: true, results });
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
  let { teacher_dni } = req.body;

  let query = `SELECT 
    course.id AS id,
    level.name AS level, 
    level.id AS levelID,
    course.speciality, 
    parallel.name AS parallel, 
    parallel.id AS parallelID,
    period.id AS periodID, 
    period.year 
    AS year
  FROM teacher
    INNER JOIN school
    ON school.teacher_dni = teacher.dni
    INNER JOIN period
    ON period.school_id = school.id
    INNER JOIN course
    ON course.period= period.id
    INNER JOIN LEVEL
    ON level.id = course.level
    INNER JOIN parallel
    ON parallel.id = course.parallel
  WHERE teacher.dni = "${teacher_dni}"`;

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

module.exports = { save, update, deleteRow, getAll, getOne };
