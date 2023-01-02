const studentQueries = {
  SAVE: (data) => {
    return `CALL insertStudent(
      "${data.dni}", 
      "${data.course_id}", 
      "${data.name}", 
      "${data.lastname}"
    )`
  },
};

const inputsQueries = {
  SAVE: (data) => {
    return `CALL newInput(
      "${data.type}", 
      "${data.course_id}", 
      "${data.date}", 
      "${data.subject}", 
      "${data.description}",
      "${data.partial}",
      "${data.quimestre}"
    )`;
  },
  DELETE: (data) => {
    return `DELETE FROM input WHERE id="${data.id}"`
  },
  GET_ONE: (data) => {
    return `
    SELECT * FROM input 
    WHERE 
      course_id= "${data.course_id}" AND
      quimestre= "${data.quimestre}" AND
      partial= "${data.partial}" AND
      subject= "${data.subject}"
    `
  },
  FOUND_MANY: (data) => {
    return ` CALL foundManyInputs(
      "${data.type}",
      "${data.subject}",
      "${data.course_id}",
      "${data.partial}",
      "${data.quimestre}"
      )`
  },
  GET_TYPES: () => {
    return `SELECT * FROM input_type`
  }
};

const courseQueries = {
  SAVE: (data) => {
    return `CALL newCourse(
      "${data.level}",
      "${data.parallel}",
      "${data.period}",
      "${data.speciality}"
    )`
  },
  UPDATE: (data) => {
    return `CALL updateCourse(
      "${data.course_id}",
      "${data.level}",
      "${data.parallel}",
      "${data.period}",
      "${data.speciality}"
    )`
  },
  GET_ALL: (data) => {
    return `CALL allCourses("${data.teacher_dni}")`
  },
  DELETE: () => {}
}

const averageQueries = {
  LOAD: (data) => {
    return `CALL loadAverages(
      "${data.course_id}",
      "${data.quimestre}",
      "${data.partial}",
      "${data.subject}"
    )
    `
  }
}

module.exports = {
  studentQueries,
  inputsQueries,
  averageQueries,
  courseQueries
};
