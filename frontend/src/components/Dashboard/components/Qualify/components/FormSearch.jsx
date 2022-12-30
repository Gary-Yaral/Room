import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getData, postData } from "../../../../../utils/requestData";
import { InputDate } from "../../commons/InputDate";
import { AreaDescription } from "../../commons/AreaDescription";
import { CustomSelect } from "../../commons/CustomSelect";
import { useForm } from "react-hook-form";
import { messageSave } from "../../../utils/messageAlert";
import { generateArrayTD, parseInputs } from "../../../utils/inputParser";

import {
  urlPartials,
  urlQuimestres,
  urlSubjects,
  urlTypeAll,
  urlCourseAll,
  urlInputStudentFound,
} from "../../../constants/routes";
import axios from "axios";

const defaultValues = {
  course_id: "",
  quimestre: "",
  partial: "",
  type: "",
  subject: "",
};

export const FormSearch = ({
  setClicked,
  setInputsFound,
  setTheads,
  setData,
  setForm,
  setInputData
}) => {
  const [courses, setCourses] = useState([]);
  const [quimestres, setQuimestres] = useState([]);
  const [partials, setPartials] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);

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
    if (teacher) {
      postData(urlCourseAll, { teacher_dni: teacher.dni }, setCourses);
      getData(urlQuimestres, setQuimestres);
      getData(urlPartials, setPartials);
      getData(urlSubjects, setSubjects);
      getData(urlTypeAll, setInputs);
    }
  }, [teacher, students]);

  const onSubmit = async (formData) => {
    setForm(formData)
    const { data } = await axios.post(urlInputStudentFound, formData);
    if (data.inputs) {
      let table = parseInputs(data.inputs, data.students);
      let thead = generateArrayTD(data.inputData, data.inputs);
      setData(data.inputs);
      setInputData(data.inputData);
      setTheads(thead);
      setInputsFound(table);
    } else {
      setInputsFound([]);
    }
    setClicked(true);
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
      <div className="container-submit">
        <input type="submit" className="locked" value="Cargar" />
      </div>
    </form>
  );
};
