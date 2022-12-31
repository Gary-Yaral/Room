const studentQueries = {
  SAVE: (dni, course_id, name, lastname) => {
    return `
    INSERT INTO student(dni, name, lastname, course_id)
    SELECT * FROM(
      SELECT "${dni}", "${name}", "${lastname}", "${course_id}"
    ) AS temp 
    WHERE NOT EXISTS (
      SELECT dni FROM student WHERE dni="${dni}" AND course_id="${course_id}"
    ) LIMIT 1`
  },
  INSERT_INPUTS: (dni, course_id) => {
    return `CALL insertInputs(
      "${dni}", 
      "${course_id}"
    )`
  }
}

module.exports = {
  studentQueries
}