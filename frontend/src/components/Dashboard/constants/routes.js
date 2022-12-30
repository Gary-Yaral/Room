
const API = "http://localhost:6500/api/v1.0"

export const schoolRoutes ={
  GET_ALL: `${API}/schools/all`
}

export const courseRoutes = {
  COURSE: `${API}/courses`,
  GET_ALL: `${API}/courses/all`
}

export const periodRoutes = {
  PERIOD: `${API}/periods`,
  PERIOD_ALL: `${API}/periods/all`,
  PERIOD_ONE: `${API}/periods/one`
}

export const inputRoutes = {
  INPUT: `${API}/inputs`,
  INPUT_FOUND_MANY: `${API}/inputs/found-many`,
  INPUT_ONE: `${API}/inputs/one`
}


let urlParallels = "http://localhost:6500/api/v1.0/parallels/all";
let urlLevels = "http://localhost:6500/api/v1.0/levels/all";

/* Quimestres */
let urlQuimestres = "http://localhost:6500/api/v1.0/quimestres/all";
let urlPartials = "http://localhost:6500/api/v1.0/partials/all";
let urlSubjects = "http://localhost:6500/api/v1.0/subjects/all";
let urlLogin = "http://localhost:6500/api/v1.0/login";
 /* TYPES */
let urlTypeAll = "http://localhost:6500/api/v1.0/inputs/all";

/* MEDIAS */
let urlMedias = "http://localhost:6500/api/v1.0/medias";


/* Input Student */
let urlInputStudentFound = "http://localhost:6500/api/v1.0/input_student/found";
let urlInputStudentsAll = "http://localhost:6500/api/v1.0/input_student/all";
let urlInputStudents = "http://localhost:6500/api/v1.0/input_student";
/* Students */
let urlStudents = "http://localhost:6500/api/v1.0/students/all";
let urlStudentsList = "http://localhost:6500/api/v1.0/students/list";

export {
  urlLogin,
  urlLevels,
  urlParallels,

  urlQuimestres, 
  urlPartials,
  urlTypeAll,
  urlSubjects,
  
  urlInputStudentFound,
  urlInputStudentsAll,
  urlInputStudents,
  urlStudents,
  urlStudentsList,
  urlMedias
}