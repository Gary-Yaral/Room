import { useState, useEffect } from "react";
import { NewPeriod } from "./components/NewPeriod";
import { PeriodTable } from "./components/PeriodTable";
import { periodRoutes, schoolRoutes } from "../../constants/routes";
import { useSelector } from "react-redux";
import { postData } from "../../../../utils/requestData";
import { schoolValues } from "./constants";

const Period = () => {
  const [school, setSchool] = useState(schoolValues);
  const [clicked, setClicked] = useState(false);
  const [periods, setPeriods] = useState([]);
  const {
    info: { teacher },
  } = useSelector(({ logged }) => logged);

  useEffect(() => {
    const data = { teacher_dni: teacher.dni };
    postData(schoolRoutes.GET_ALL, data, setSchool, true);
    postData(periodRoutes.PERIOD_ALL, data, setPeriods);
  }, [teacher, clicked]);

  return (
    <div className="container-view">
      <div className="form-title">Nuevo periodo</div>
      <NewPeriod clicked={clicked} setClicked={setClicked} school={school} />
      <div className="form-title">Periodos registrados</div>
      <PeriodTable
        clicked={clicked}
        setClicked={setClicked}
        school={school}
        periods={periods}
      />
    </div>
  );
};

export { Period };
