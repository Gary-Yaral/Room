import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getData, postData } from "../../../../../utils/requestData";
import { CustomSelect } from "../../commons/CustomSelect";
import { defaultValues } from "../constants";
import { createTitle } from "../utils/createTitle";
import axios from "axios";
import {
  urlPartials,
  urlQuimestres,
  urlSubjects,
  urlCourseAll,
  urlMedias
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
      let requestData =  { teacher_dni: dni }
      postData(urlCourseAll, requestData, setCourses);
      getData(urlQuimestres, setQuimestres);
      getData(urlPartials, setPartials);
      getData(urlSubjects, setSubjects);
  }, []);

  const onSubmit = async(formData) => {
    const { course_id, subject, quimestre, partial } = formData
    const _course = courses.filter(course => course.id === parseInt(course_id))
    const _subject = subjects.filter(sub => sub.id === parseInt(subject))
    const _quimestre = quimestres.filter(quim => quim.id === parseInt(quimestre))
    const _partial = partials.filter(part => part.id === parseInt(partial))

    const titleData = createTitle({
      course: _course[0],
      subject: _subject[0],
      quimestre: _quimestre[0],
      partial: _partial[0]
    })
    
    const { data: {results} } = await axios.post(urlMedias, formData)
    handleLoad(course_id, results, titleData)
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
        <div className="container-submit">
          <input type="submit" className="locked" value="Cargar" />
        </div>
      </form>
    </div>
  );
};

export { AverageForm };
