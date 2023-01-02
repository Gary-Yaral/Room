import { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { inputRoutes } from "../../../constants/routes"
import { messageDelete } from "../../../utils/messageAlert"

export const InputTableAll = ({clicked, setClicked, results}) => {
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState({id: "", period: ""})

  const handleClick = (e, type) => {
    let td = e.target.parentNode;
    let tr = td.parentNode;
    console.log(tr.id);
    /* if (type == "update") {
      let year = tr.getAttribute('year');
      setSelected({id: tr.id, period: year})
      setModal(true);
    } */

    if (type == "delete") {
      messageDelete({
        url: inputRoutes.INPUT,
        objectData: { id: tr.id },
        name: "Insumo",
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
                <th className="th-fixed th-left">Insumo</th>
                <th className="th-fixed th-left">Curso</th>
                <th className="th-fixed th-left">Quimestre</th>
                <th className="th-fixed th-left">Parcial</th>
                <th className="th-fixed th-left">Descripción</th>
                <th className="th-fixed th-left">Fecha</th>
                <th className="th-fixed">Op.</th>
              </tr>
            </thead>
            <tbody>
              {results[0].map((tr, index) => {
               
                let courseName = `${tr.level_name} ${tr.parallel_name} ${tr.year}`
                let date = tr.date.split("T")[0];
                let key = `tr-${index}`;
                return (
                  <tr key={key} id={tr.id} course={tr.course_id}>
                    <td className="custom-td td-number">{index + 1}</td>
                    <td className="custom-td">{tr.input_name}</td>
                    <td className="custom-td">{courseName}</td>
                    <td className="custom-td">{tr.quimestre_name}</td>
                    <td className="custom-td">{tr.partial_name}</td>
                    <td className="custom-td">{tr.description}</td>
                    <td className="custom-td">{date}</td>
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

