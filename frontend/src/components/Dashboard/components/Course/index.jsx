import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { postData, getData } from "../../../../utils/requestData";
import { CustomSelect } from "../commons/CustomSelect";
import { useForm } from "react-hook-form";
import { CoursesTable } from "./components/CoursesTable";
import { InputSpecialty } from "../commons/InputSpecialty";
import { messageSave } from "../../utils/messageAlert";
import { defaultValues } from "./constants";
import {
  schoolRoutes,
  periodRoutes,
  urlLevels,
  urlParallels,
  courseRoutes,
} from "../../constants/routes";

export function Course() {
  const [levels, setLevels] = useState([]);
  const [parallels, setParallels] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [courses, setCourses] = useState([]);
  const [school, setSchool] = useState([]);
  const [clicked, setClicked] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const {
    info: { teacher },
  } = useSelector(({ logged }) => logged);

  const onSubmit = (data) => {
    let speciality = data.speciality;
    if (speciality.length > 0) {
      speciality = data.speciality
        .split(" ")
        .filter((text) => text !== "")
        .join(" ");
    }

    let obj = { ...data, speciality };
    messageSave({
      url: courseRoutes.COURSE,
      objectData: obj,
      name: "Periodo",
      letterA: false,
      reset: () => reset(defaultValues),
      refresh: () => (clicked ? setClicked(false) : setClicked(true)),
    });
  };

  useEffect(() => {
    const data = { teacher_dni: teacher.dni }
    postData(schoolRoutes.GET_ALL, data, setSchool);
    postData(periodRoutes.PERIOD_ALL, data, setPeriods);
    postData(courseRoutes.GET_ALL, data, setCourses);
    getData(urlLevels, setLevels);
    getData(urlParallels, setParallels);
  }, [teacher, clicked]);

  return (
    <div className="container-view">
      <div className="form-title">Nuevo curso</div>
      <form className="multi-input" onSubmit={handleSubmit(onSubmit)}>
        <CustomSelect
          title={"Periodo"}
          prop={"year"}
          name={"period"}
          options={periods}
          register={register}
          errors={errors}
          letterA={false}
          isProp={true}
        />
        <CustomSelect
          title={"Nivel"}
          prop={"name"}
          name={"level"}
          options={levels}
          register={register}
          errors={errors}
          letterA={false}
          isProp={true}
        />
        <CustomSelect
          title={"Paralelo"}
          prop={"name"}
          name={"parallel"}
          options={parallels}
          register={register}
          errors={errors}
          letterA={false}
          isProp={true}
        />
        <InputSpecialty
          name={"speciality"}
          register={register}
          errors={errors}
        />
        <div className="container-submit">
          <input type="submit" className="locked" value="Crear" />
        </div>
      </form>
      <div className="form-title">Cursos registrados</div>
      <CoursesTable
        clicked={clicked}
        setClicked={setClicked}
        schoolData={{ school, periods, levels, courses, parallels }}
      />
    </div>
  );
}

