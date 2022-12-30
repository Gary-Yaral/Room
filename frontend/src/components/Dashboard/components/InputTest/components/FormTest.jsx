import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getData, postData } from "../../../../../utils/requestData";
import { InputDate } from "../../commons/InputDate";
import { AreaDescription } from "../../commons/AreaDescription";
import { CustomSelect } from "../../commons/CustomSelect";
import { useForm } from "react-hook-form";
import {
  urlPartials,
  urlQuimestres,
  urlSubjects,
  courseRoutes
} from "../../../constants/routes";

export const FormTest = () => {
  const [courses, setCourses] = useState([]);
  const [quimestres, setQuimestres] = useState([]);
  const [partials, setPartials] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const {
    info: { teacher },
  } = useSelector(({ logged }) => {
    return logged;
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    const { dni } = teacher;
    const data = { teacher_dni: dni };
    postData(courseRoutes.GET_ALL, data, setCourses);
    getData(urlQuimestres, setQuimestres);
    getData(urlPartials, setPartials);
    getData(urlSubjects, setSubjects);
  }, [teacher]);

  const onSubmit = async (data) => {
   
  };
  
  return (
    <form className="multi-input" onSubmit={handleSubmit(onSubmit)}>
      <CustomSelect
        title={"Curso"}
        prop={["level", "parallel", "year"]}
        name={"course_id"}
        options={courses}
        register={register}
        errors={errors}
        letterA={false}
        isProp={true}
      />
      <CustomSelect
        title={"Materia"}
        prop={"name"}
        name={"subject"}
        options={subjects}
        register={register}
        errors={errors}
        letterA={true}
        isProp={true}
      />
      <CustomSelect
        title={"Quimestre"}
        prop={"name"}
        name={"quimestre"}
        options={quimestres}
        register={register}
        errors={errors}
        letterA={false}
        isProp={true}
      />
      <div className="container-submit">
        <input type="submit" className="locked" value="Crear" />
      </div>
    </form>
  );
};

