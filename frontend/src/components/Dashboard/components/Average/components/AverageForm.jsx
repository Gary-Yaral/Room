import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getData, postData } from "../../../../../utils/requestData";
import { CustomSelect } from "../../commons/CustomSelect";
import { defaultTitle, defaultValues } from "../constants";
import { createTitle } from "../utils/createTitle";
import { readArray } from "../../../utils/readArray";

import axios from "axios";
import {
  urlPartials,
  urlQuimestres,
  urlSubjects,
  courseRoutes,
  averageRoute,
} from "../../../constants/routes";

const AverageForm = ({ handleLoad, dni }) => {
  const [courses, setCourses] = useState([]);
  const [quimestres, setQuimestres] = useState([]);
  const [partials, setPartials] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  useEffect(() => {
    let requestData = { teacher_dni: dni };
    postData(courseRoutes.GET_ALL, requestData, setCourses);
    getData(urlQuimestres, setQuimestres);
    getData(urlPartials, setPartials);
    getData(urlSubjects, setSubjects);
  }, []);

  const onSubmit = async (formData) => {
    const { course_id, subject, quimestre, partial } = formData;
    let titleData = defaultTitle;
    if (readArray(courses).length > 0) {
      const _course = readArray(courses).filter(
        (course) => course.id === parseInt(course_id)
      );
      const _subject = subjects.filter((sub) => sub.id === parseInt(subject));
      const _quimestre = quimestres.filter(
        (quim) => quim.id === parseInt(quimestre)
      );
      const _partial = partials.filter((part) => part.id === parseInt(partial));

      titleData = createTitle({
        course: _course[0],
        subject: _subject[0],
        quimestre: _quimestre[0],
        partial: _partial[0],
      });
    }

    const {
      data: { results },
    } = await axios.post(averageRoute.AVERAGE, formData);
    handleLoad(course_id, results[0], titleData);
  };

  return (
    <div className="container-view">
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
    </div>
  );
};

export { AverageForm };
