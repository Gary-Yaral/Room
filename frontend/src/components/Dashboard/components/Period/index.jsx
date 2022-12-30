import { useState, useEffect } from "react";
import { NewPeriod } from "./components/NewPeriod";
import { Table } from "./components/Table";
import { urlPeriodAll, urlSchools } from "../../constants/routes";
import { useSelector } from "react-redux";
import { postData } from "../../../../utils/requestData";
import { schoolValues } from "./constants";

const Period = () => {
  const [school, setSchool] = useState(schoolValues);
  const { info } = useSelector(({ logged }) => logged);
  const [clicked, setClicked] = useState(false);
  const [periods, setPeriods] = useState([]);

  useEffect(() => {
    if (info.teacher) {
      postData(urlSchools, { teacher_dni: info.teacher.dni }, setSchool, true);
      postData(urlPeriodAll, { teacher_dni: info.teacher.dni }, setPeriods);
    }
  }, [info, clicked]);

  return (
    <div className="container-view">
      <div className="form-title">Nuevo periodo</div>
      <NewPeriod clicked={clicked} setClicked={setClicked} school={school} />
      <div className="form-title">Periodos registrados</div>
      <Table
        clicked={clicked}
        setClicked={setClicked}
        school={school}
        periods={periods}
      />
    </div>
  );
};

export { Period };
