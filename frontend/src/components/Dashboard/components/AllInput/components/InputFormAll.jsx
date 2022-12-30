import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { getData, postData } from "../../../../../utils/requestData";
import { CustomSelect } from "../../commons/CustomSelect";
import { defaultValues } from "../constants";
import {
  urlPartials,
  urlQuimestres,
  urlSubjects,
  urlTypeAll,
  courseRoutes,
  inputRoutes,
} from "../../../constants/routes";

export const InputFormAll = ({ setClicked, setResults }) => {
  const [courses, setCourses] = useState([]);
  const [quimestres, setQuimestres] = useState([]);
  const [partials, setPartials] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const {
    info: { teacher },
  } = useSelector(({ logged }) => logged);

  useEffect(() => {
    const { dni } = teacher;
    const data = { teacher_dni: dni };
    postData(courseRoutes.GET_ALL, data, setCourses);
    getData(urlQuimestres, setQuimestres);
    getData(urlPartials, setPartials);
    getData(urlSubjects, setSubjects);
    getData(urlTypeAll, setInputs);
  }, [teacher]);

  const onSubmit = (data) => {
    setClicked(true);
    postData(inputRoutes.INPUT_FOUND_MANY, data, setResults);
  };

  return (
    <div className="container-view">
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
        <CustomSelect
          title={"Parcial"}
          prop={"name"}
          name={"partial"}
          options={partials}
          register={register}
          errors={errors}
          letterA={false}
          isProp={true}
        />
        <CustomSelect
          title={"Tipo"}
          prop={"name"}
          name={"type"}
          options={inputs}
          register={register}
          errors={errors}
          letterA={false}
          isProp={true}
        />
        <div className="container-submit">
          <input type="submit" className="locked" value="Cargar" />
        </div>
      </form>
    </div>
  );
};
