import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { capitalize } from "../../../utils/capitalize";
import { urlInputStudents } from "../../../constants/routes";

export const TableSearch = ({ inputsFound, theads, changed, setChanged }) => {
  const [disabled, setDisabled] = useState([]);
  const [values, setValues] = useState([]);

  const handleClick = async (e) => {
    let input = e.target.id;
    if (disabled[input]) return setDisabled({ ...disabled, [input]: false });

    let tds = document.querySelectorAll(`input[input_id='${input}']`);
    let arr = Array.from(tds);
    let update = arr.map((note) => {
      let id = parseInt(note.id);
      let qualification = parseFloat(note.value);
      return { qualification, id };
    });

    const result = await axios.put(urlInputStudents, update);
    setValues(inputsFound);
    setChanged(changed ? false : true);
    if (!disabled[input]) setDisabled({ ...disabled, [input]: true });
  };

  const handleChange = (e) => {
    let index = e.target.getAttribute("index");
    let input_id = e.target.getAttribute("input_id");
    let student = e.target.getAttribute("student");
    let value = "";

    if (e.target.value !== "") {
      value = parseFloat(e.target.value);
      if (value > 10) return;
      let decimals = value.toString().split(".");
      if (decimals[1] && decimals[1].length > 2) return;
    }

    values[index].inputs = values[index].inputs.map((input) => {
      if (input.student === parseInt(student) && parseInt(input_id) === input.input) {
        input.qualification = value;
      }
      return input;
    });

    setValues([...values]);
  };

  useEffect(() => {
    setValues(inputsFound);
    setDisabled(theads.disabled)
  }, []);
  
  useEffect(() => {
    setValues(inputsFound);
    setDisabled(theads.disabled)
  }, [inputsFound, theads]);

  return (
    <div className="container-table">
      <div className="outer-wrapper">
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th className="th-fixed">N°</th>
                <th className="th-fixed">Alumnos</th>
                {theads.theads.map((th, index) => {
                  let keyProp = `th-${index}`;
                  return (
                    <th className="th-fixed th-vertical" key={keyProp} title={th.description}>
                      {th.name}
                      <button
                        className={`btn-th deactive ${
                          !disabled[th.thID] ? "btn-save" : "btn-edit"
                        }`}
                        column={index + 3}
                        id={th.thID}
                        onClick={(e) => handleClick(e)}
                      >
                        {!disabled[th.thID] ? <BiSave /> : <AiFillEdit />}
                      </button>
                    </th>
                  );
                })}
                <th className="th-fixed">Prom.</th>
              </tr>
            </thead>
            <tbody>
              {values.map((tr, index) => {
                let name = tr.user.name
                let keyProp = `tr-${index + 1}`;
                return (
                  <tr className="custom-tr" key={keyProp} student={tr.user.dni}>
                    <td className="custom-td td-number">{index + 1}</td>
                    <td className="custom-td td-name">{tr.user.name && 
                      name.split(" ").map((word) => {
                          return capitalize(word)
                        }).join(" ")
                    }</td>
                    {tr.inputs.map((input, n) => {
                      let key = `td-${n}`;
                      return (
                        <td
                          className={`custom-td td-number ${
                            disabled[input.input] ? "td-deactive" : "td-active"
                          }`}
                          key={key}
                        >
                          <input
                            className="box-note"
                            disabled={disabled[input.input]}
                            type="number"
                            input_id={input.input}
                            student={input.student}
                            index={index}
                            id={input.id}
                            value={input.qualification}
                            step="0.01"
                            onChange={(e) => handleChange(e)}
                          />
                        </td>
                      );
                    })}
                    {<td className={`custom-td td-number ${tr.media < 7 ? "td-red": ""}`}>{tr.media}</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
