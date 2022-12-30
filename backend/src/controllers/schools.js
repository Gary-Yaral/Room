const { connection } = require('../sql/connection')

const save = (req, res) => {
  let { name, address, code, telephone, teacher_dni} = req.body
  let values = `"${name}","${address}", "${code}", "${telephone}", "${teacher_dni}"`
  let query = `INSERT INTO school(name, address, code, telephone, teacher_dni) VALUES(${values})`

 return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results })
  })
}

const update = (req, res) => {
  let { id, name, address, code, telephone } = req.body

  let query = `UPDATE school 
    SET 
      name="${name}", 
      address="${address}",
      code="${code}",
      telephone=${telephone}
    WHERE id="${id}"`

 return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results })
  })
}

const deleteRow = (req, res) => {
  let { id } = req.body
  let query = `DELETE FROM school WHERE id="${id}"`

  return connection.query(query, (error, results) => {
    if(error) {
      if(error.errno = 1451) {
        return res.status(200).json({
          results:{
            affectedRows: 0,
            errno: 1451
          }
        })
      }

      throw error
    }
    
    return res.status(200).json({results})
  })
}

const getAll = (req, res) => {
  let {teacher_dni} = req.body
  let query = `SELECT * FROM school WHERE teacher_dni = "${teacher_dni}"`
  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results })
  })
}

const getOne = (req, res) => {
  let {id} = req.body
  let query = `SELECT * FROM school WHERE id= "${id}"`

 return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results })
  })
}

module.exports = { save, update, deleteRow, getAll, getOne }