import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getData, postData } from "../../../../../utils/requestData";
import { InputDate } from "../../commons/InputDate";
import { AreaDescription } from "../../commons/AreaDescription";
import { CustomSelect } from "../../commons/CustomSelect";
import { useForm } from "react-hook-form";
import { messageSave } from "../../../utils/messageAlert";
import { defaultValues } from "../constants";
import axios from "axios";
import {
  urlPartials,
  urlQuimestres,
  urlSubjects,
  urlTypeAll,
  courseRoutes,
  inputRoutes,
  studentRoutes,
} from "../../../constants/routes";
import { readArray } from "../../../utils/readArray";

const InputForm = ({ clicked, setClicked }) => {
  const [courses, setCourses] = useState([]);
  const [quimestres, setQuimestres] = useState([]);
  const [partials, setPartials] = useState([]);
  const [inputs, setInputs] = useState([]);
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
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    const { dni } = teacher;
    const data = { teacher_dni: dni };
    postData(courseRoutes.GET_ALL, data, setCourses);
    getData(urlQuimestres, setQuimestres);
    getData(urlPartials, setPartials);
    getData(urlSubjects, setSubjects);
    getData(urlTypeAll, setInputs);
  }, [teacher]);

  const onSubmit = async (data) => {
    let description = data.description;
    if (description.length > 0) {
      description = description
        .split(" ")
        .filter((text) => text !== "")
        .join(" ");
    }

    const {
      data: { results },
    } = await axios.post(studentRoutes.GET_LIST, { course_id: data.course_id });
    let obj = { ...data, students: results, description };
    messageSave({
      url: inputRoutes.INPUT,
      objectData: obj,
      name: "Insumo",
      letterA: false,
      reset: () => reset(defaultValues),
      refresh: () => (clicked ? setClicked(false) : setClicked(true)),
    });
  };
  return (
    <form className="multi-input" onSubmit={handleSubmit(onSubmit)}>
      <CustomSelect
        title={"Curso"}
        prop={["level", "parallel", "year"]}
        name={"course_id"}
        options={readArray(courses)}
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
        title={"Tipo"}
        prop={"name"}
        name={"type"}
        options={inputs}
        register={register}
        errors={errors}
        letterA={false}
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
      <InputDate
        title="Fecha de envío"
        name="date"
        register={register}
        errors={errors}
      />
      <AreaDescription
        title="Descripción"
        name="description"
        register={register}
        errors={errors}
      />
      <div className="container-submit">
        <input type="submit" className="locked" value="Crear" />
      </div>
    </form>
  );
};

export { InputForm };
