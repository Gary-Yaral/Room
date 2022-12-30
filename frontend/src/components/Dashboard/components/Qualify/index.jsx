import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { capitalize } from "../../utils/capitalize";
import { generateArrayTD, parseInputs } from "../../utils/inputParser";
import { urlInputStudentFound } from "../../constants/routes";
import { QualifyForm } from "./components/QualifyForm";
import { QualifyTable } from "./components/QualifyTable";

const initialValues = {
  course_id: "",
  quimestre: "",
  partial: "",
  type: "",
  subject: "",
};

export const Qualify = () => {
  const [clicked, setClicked] = useState(false);
  const [changed, setChanged] = useState(false);
  const [inputsFound, setInputsFound] = useState([]);
  const [inputData, setInputData] = useState({ name: "", total: "" });
  const [theads, setTheads] = useState([]);
  const [data, setData] = useState([]);
  const [form, setForm] = useState([]);

  useEffect(() => {
    if (!Array.isArray(form)) {
      axios.post(urlInputStudentFound, form).then(({ data }) => {
        if (data.inputs) {
          let table = parseInputs(data.inputs, data.students);
          let thead = generateArrayTD(data.inputData, data.inputs);
          setData(data.inputs);
          setTheads(thead);
          setInputsFound(table);
        } else {
          setInputsFound([]);
        }
      });
    }
  }, [changed]);

  return (
    <div className="container-view">
      <div className="form-title">Calificar</div>
      <QualifyForm
        clicked={clicked}
        setClicked={setClicked}
        setInputsFound={setInputsFound}
        setTheads={setTheads}
        setData={setData}
        setForm={setForm}
        setInputData={setInputData}
      />
      {clicked && inputsFound.length === 0 && (
        <div>No existen coincidencias</div>
      )}
      {inputsFound.length > 0 && (
        <>
          <div className="form-title">
            {inputData.name !== "" && 
              inputData.name.split(" ").map((word) => {
                return capitalize(word)
              }).join(" ")
            }
          </div>
          <QualifyTable
            changed={changed}
            setChanged={setChanged}
            inputsFound={inputsFound}
            theads={theads}
          />
        </>
      )}
    </div>
  );
};
