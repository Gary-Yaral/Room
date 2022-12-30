const { connection } = require("../sql/connection");
const { generateUpdateSQL } = require("../utils/functions/generateMultiQuery");

const save = (req, res) => {
  let { name, address, code, telephone, teacher_dni } = req.body;
  let values = `"${name}","${address}", "${code}", "${telephone}", "${teacher_dni}"`;
  let query = `INSERT INTO school(name, address, code, telephone, teacher_dni) VALUES(${values})`;

  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results });
  });
};

const update = async (req, res) => {
  let queries =generateUpdateSQL(req.body, 'input_student').join("; ")
  connection.query(queries, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results });
  });
};

const deleteRow = (req, res) => {
  let { id } = req.body;
  let query = `DELETE FROM school WHERE id="${id}"`;
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
  let query = "SELECT * FROM input_student";
  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results });
  });
};

const foundMany = (req, res) => {
  let { course_id, partial, quimestre, subject, type } = req.body;
  let query = `SELECT 
    input.id AS input,
    input_student.id AS id,
    input_type.name,
    input_student.student,
    input.description AS description,
    input.date AS date,
    qualification
  FROM input
    INNER JOIN input_student
    ON input_student.input = input.id  
    INNER JOIN input_type
    ON input.type = input_type.id  
  WHERE 
    course_id= "${course_id}" AND
    quimestre= "${quimestre}" AND
    partial= "${partial}" AND
    subject= "${subject}" AND
    type= "${type}"
  ORDER BY input.date`;

  return connection.query(query, (error, results) => {
    if (error) throw error;
    if (results.length === 0) {
      return res.status(200).json({ results });
    }

    let inputs = results;
    query = `SELECT * FROM student WHERE course_id = ${course_id}`;
    connection.query(query, (error, results) => {
      if (error) throw error;
      let students = results;
      query = `SELECT 
        COUNT(*) AS total, 
        input_type.name
      FROM input 
        INNER JOIN input_type 
        ON input.type = input_type.id  
      WHERE 
        course_id= "${course_id}" AND
        quimestre= "${quimestre}" AND
        partial= "${partial}" AND
        subject= "${subject}" AND
        type= "${type}"`;
      connection.query(query, (error, results) => {
        if (error) throw error;
        let inputData = results[0];
        return res.status(200).json({ inputData, inputs, students });
      });
    });
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

module.exports = { save, update, deleteRow, getAll, getOne, foundMany };
