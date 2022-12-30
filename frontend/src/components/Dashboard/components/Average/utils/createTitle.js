const createTitle = (titleData) => {
  const { course, subject, quimestre, partial } = titleData
  const {level, parallel, year} = course
  const courseName = `${level} ${parallel} ${year}`

  return {
    course: courseName,
    subject: subject.name,
    quimestre: quimestre.name,
    partial: partial.name
  }

}

export { createTitle }