const studentQueries = {
  SAVE: (dni, course_id, name, lastname) => {
    return `CALL insertStudent("${dni}", "${course_id}", "${name}", "${lastname}")`;
  },
};

const inputsQueries = {
  SAVE: (type, course, date, subject, description, partial, quimestre) => {
    return `CALL newInput(
      "${type}", 
      "${course}", 
      "${date}", 
      "${subject}", 
      "${description}",
      "${partial}",
      "${quimestre}"
    );`;
  },
};

module.exports = {
  studentQueries,
  inputsQueries
};
