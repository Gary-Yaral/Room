import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { postData } from "../../../../utils/requestData";
import { courseRoutes, studentRoutes } from "../../constants/routes";
import { NewStudent } from "./components/NewStudent";
import { StudentTable } from "./components/StudentTable";
import { defaultValues } from "./constants";

const Student = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState("");
  const [searched, setSearched] = useState(false);
  const [found, setFound] = useState([]);
  const [clicked, setClicked] = useState(false);
  const {
    info: { teacher },
  } = useSelector(({ logged }) => logged);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    const data = { teacher_dni: teacher.dni };
    postData(courseRoutes.GET_ALL, data, setCourses);
  }, [teacher, clicked]);

  const refreshTable = (value) => {
    postData(studentRoutes.GET_ALL, { course_id: value }, setFound);
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    setCourse(e.target.value);
    if (value !== "") {
      setSearched(true);
      refreshTable(value);
    } else {
      setSearched(false);
    }
  };
  return (
    <div className="container-view">
      <div className="form-title">Nuevo estudiante</div>
      <NewStudent courses={courses} clicked={clicked} setClicked={setClicked} />
      <div className="container-input">
        <div className="form-title">Cargar estudiantes</div>
        <select
          className="custom-select"
          name="course"
          id="course"
          value={course}
          onChange={handleSearch}
        >
          <option value="">Seleccione el curso</option>
          {courses.map((opt, index) => {
            let key = `${opt.id}`;
            return (
              <option value={opt.id} key={key}>
                {`${opt.level} ${opt.parallel} ${opt.year}`}
              </option>
            );
          })}
        </select>
      </div>
      {found.length > 0 && searched && (
        <StudentTable
          clicked={clicked}
          setClicked={setClicked}
          students={found}
          refreshTable={() => refreshTable(course)}
        />
      )}
      {found.length === 0 && searched && <div>Sin resultados</div>}
    </div>
  );
};

export { Student };
