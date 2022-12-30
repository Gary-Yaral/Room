import { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { messageDelete } from "../../../utils/messageAlert";
import { periodRoutes } from "../../../constants/routes";
import { PeriodUpdate } from "./PeriodUpdate";

export const PeriodTable = ({ school, periods, setClicked, clicked }) => {
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState({id: "", period: ""})
  const handleClick = (e, type) => {
    let td = e.target.parentNode;
    let tr = td.parentNode;
    if (type == "update") {
      let year = tr.getAttribute('year');
      setSelected({id: tr.id, period: year})
      setModal(true);
    }

    if (type == "delete") {
      messageDelete({
        url: periodRoutes.PERIOD,
        objectData: { id: tr.id },
        name: "Periodo",
        refresh: () => (clicked ? setClicked(false) : setClicked(true)),
      });
    }
  };

  return (
    <div className="container-table">
      {modal && (
        <PeriodUpdate
          school={school}
          setClicked={setClicked}
          clicked={clicked}
          setModal={setModal}
          values={selected}
        />
      )}
      <div className="outer-wrapper">
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th className="th-fixed">N°</th>
                <th className="th-fixed th-left">Escuela</th>
                <th className="th-fixed th-left">Periodo</th>
                <th className="th-fixed">Op.</th>
              </tr>
            </thead>
            <tbody>
              {periods.map((tr, index) => {
                let key = `tr-${index}`;
                return (
                  <tr key={key} id={tr.id} year={tr.year}>
                    <td className="custom-td td-number">{index + 1}</td>
                    <td className="custom-td">{tr.name}</td>
                    <td className="custom-td">{tr.year}</td>
                    <td className="custom-td td-btns">
                      <button
                        className="btn-table"
                        onClick={(e) => handleClick(e, "update")}
                      >
                        <AiFillEdit />
                      </button>
                      <button
                        className="btn-table btn-delete"
                        onClick={(e) => handleClick(e, "delete")}
                      >
                        <AiFillDelete />
                      </button>
                    </td>
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
