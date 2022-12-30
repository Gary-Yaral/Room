const { connection } = require("../sql/connection");

const found = (req, res) => {
  const { quimestre, partial, subject, course_id } = req.body;

  let query = `SELECT 
  student.dni,
  CONCAT(student.lastname, " ",student.name) AS fullname, 
  input_type.name AS input, 
  input_type.id AS input_id,
  AVG(input_student.qualification) AS average 
FROM input_student 
  INNER JOIN student
  ON student.id = input_student.student
  INNER JOIN input
  ON input.id = input_student.input
  INNER JOIN input_type
  ON input_type.id = input.type
  INNER JOIN SUBJECT
  ON input_type.id = input.type
WHERE 
  student.course_id = "${course_id}" AND
  quimestre ="${quimestre}" AND 
  partial = "${partial}" AND
  subject ="${subject}"
GROUP BY student, input_type.id`;

  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results });
  });
};

module.exports = { found };
