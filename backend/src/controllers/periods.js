const { connection } = require("../sql/connection");

const save = (req, res) => {
  let { school_id, year } = req.body;
  let query = `SELECT * FROM period 
    WHERE 
      year = "${year}" and 
      school_id = "${school_id}"`;
      
      connection.query(query, (error, results) => {
        if (error) throw error;
        if(results.length > 0) {
          return res.json({ status: false, error: `Periodo ${year} ya existe` });
        }

        query = `INSERT INTO period(year, school_id) 
          VALUES ("${year}", "${school_id}")`;
      
        connection.query(query, (error, results) => {
          if (error) throw error;
          return res
            .status(200)
            .json({ status: true, results });
        });
  });
};

const update = (req, res) => {
  let { id , year, school_id } = req.body;

  let query = `SELECT * FROM period 
    WHERE 
      year = "${year}" and 
      school_id = "${school_id}"`;
      
      connection.query(query, (error, results) => {
        if (error) throw error;
        if(results.length > 0 && results[0].id !== id) {
          return res.json({ status: false, error: `Periodo ${year} ya existe` });
        }

        query = `UPDATE period SET year="${year}"
            WHERE id="${id}"`;
      
        connection.query(query, (error, results) => {
          if (error) throw error;
          return res
            .status(200)
            .json({ status: true, results });
        });
  });

};

const deleteRow = (req, res) => {
  let { id } = req.body;
  let query = `DELETE FROM period WHERE id="${id}"`;

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
  let query = `SELECT period.id, school.name, period.year 
    FROM period
    INNER JOIN school
    ON period.school_id = school.id
    WHERE school.teacher_dni = "${teacher_dni}"`;

  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results });
  });
};

const getOne = (req, res) => {
  let { school_id } = req.body;
  let query = `SELECT * FROM period WHERE school_id= "${school_id}"`;

  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results });
  });
};

module.exports = { save, update, deleteRow, getAll, getOne };
