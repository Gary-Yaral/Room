import { useState } from "react";
import { messageDelete } from "../../../utils/messageAlert"
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export const StudentTable = ({ clicked, setClicked, students }) => {
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
        url: urlPeriod,
        objectData: { id: tr.id },
        name: "Periodo",
        refresh: () => (clicked ? setClicked(false) : setClicked(true)),
      });
    }
  };

  return (
    <div className="container-table">
      {/* {modal && (
        <PeriodUpdate
          school={school}
          setClicked={setClicked}
          clicked={clicked}
          setModal={setModal}
          values={selected}
        />
      )} */}
      <div className="outer-wrapper">
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th className="th-fixed">N°</th>
                <th className="th-fixed th-left">Identificación</th>
                <th className="th-fixed th-left">Nombres</th>
                <th className="th-fixed th-left">Apellidos</th>
                <th className="th-fixed">Curso</th>
                <th className="th-fixed">Op.</th>
              </tr>
            </thead>
            <tbody>
              {students.map((tr, index) => {
                let courseName = `${tr.level} ${tr.parallel} ${tr.year}`
                let key = `tr-${index}`;
                return (
                  <tr key={key} id={tr.id} course={tr.course_id}>
                    <td className="custom-td td-number">{index + 1}</td>
                    <td className="custom-td">{tr.dni}</td>
                    <td className="custom-td">{tr.name}</td>
                    <td className="custom-td">{tr.lastname}</td>
                    <td className="custom-td">{courseName}</td>
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
}
