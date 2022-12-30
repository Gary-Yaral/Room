import { SchoolInfo } from "./components/SchoolInfo";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { postData } from "../../../../utils/requestData";
import { urlSchools } from "../../constants/routes";
import { defaultValues } from "./constants";

export const School = () => {
  const [school, setSchool] = useState(defaultValues);
  const [refresh, setRefresh] = useState(false);
  const [locked, setLocked] = useState(false);
  const {
    info: { teacher },
  } = useSelector(({ logged }) => logged);

  useEffect(() => {
    const data = { teacher_dni: teacher.dni }
    postData(urlSchools, data, setSchool, true);
  }, [teacher]);

  return (
    <div className="container-view">
      <div className="form-title">Datos de escuela</div>
      <SchoolInfo
        locked={locked}
        setLocked={setLocked}
        school={school}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </div>
  );
};
