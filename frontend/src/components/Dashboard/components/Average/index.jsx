import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { urlStudents, urlTypeAll } from "../../constants/routes";
import { generateAverage } from "../../utils/generateAverage";
import { AverageForm } from "./components/AverageForm";
import { AverageTable } from "./components/AverageTable";
import { defaultTitle } from "./constants";
import { capitalize } from "../../utils/capitalize";

export const Average = () => {
  const [types, setTypes] = useState([]);
  const [students, setStudents] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [averages, setAverages] = useState([]);
  const [title, setTitle] = useState(defaultTitle);
  const {
    info: { teacher },
  } = useSelector(({ logged }) => logged);

  useEffect(() => {
    axios.post(urlTypeAll, setTypes).then(({ data: { results } }) => {
      results = results.sort((a, b) => a.id - b.id);
      setTypes(results);
    });
  }, [teacher]);

  useEffect(() => {
    if (inputs.length > 0 && types.length > 0 && students.length > 0) {
      setAverages(generateAverage(inputs, students, types));
    }
  }, [inputs, types, students]);

  const handleLoad = async (course, notes, titleData) => {
    const requestData = { course_id: course };
    const { data: results } = await axios.post(urlStudents, requestData);
    const stds = results.results;
    setStudents(stds);
    setInputs(notes);
    setTitle(titleData);
  };

  return (
    <div className="container-view">
      <div className="form-title">Cargar promedios</div>
      {teacher && <AverageForm handleLoad={handleLoad} dni={teacher.dni} />}
      {averages.length > 0 && (
        <>
          <div className="form-title">
            <div>{title.course}</div>
            <div>{title.subject}</div>
            <div>{`Q: ${capitalize(title.quimestre)}`}</div>
            <div>{`P: ${capitalize(title.partial)}`}</div>
          </div>
          <AverageTable averages={averages} types={types} />
        </>
      )}
    </div>
  );
};
