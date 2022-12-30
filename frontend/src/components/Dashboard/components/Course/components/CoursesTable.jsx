import { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { messageDelete } from "../../../utils/messageAlert";
import { urlCourse } from "../../../constants/routes";
import { CourseUpdate } from "./CourseUpdate";
import { defaultValues } from "../constants"

export const CoursesTable = ({ schoolData, clicked, setClicked }) => {
  const [modal, setModal] = useState(false);
  const { school, courses, periods, levels, parallels } = schoolData;
  const [selected, setSelected] = useState(defaultValues);

  const handleClick = (e, type) => {
    let td = e.target.parentNode;
    let tr = td.parentNode;
    if (type == "update") {
      let period = tr.getAttribute("period");
      let level = tr.getAttribute("level");
      let parallel = tr.getAttribute("parallel");
      let speciality = tr.getAttribute("speciality");
      let id = tr.getAttribute("id");
      setSelected({ id: parseInt(id), period, parallel, level, speciality });
      setModal(true);
    }

    if (type == "delete") {
      messageDelete({
        url: urlCourse,
        objectData: { id: tr.id },
        name: "Curso",
        refresh: () => (clicked ? setClicked(false) : setClicked(true)),
      });
    }
  };

  return (
    <div className="container-table">
      {modal && (
        <CourseUpdate
          setClicked={setClicked}
          clicked={clicked}
          setModal={setModal}
          values={selected}
          schoolData={{ school, periods, levels, parallels }}
          periods={periods}
          selected={selected}
        />
      )}
      <div className="outer-wrapper">
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th className="th-fixed">N°</th>
                <th className="th-fixed th-left">Nivel</th>
                <th className="th-fixed th-left">Paralelo</th>
                <th className="th-fixed th-left">Periodo</th>
                <th className="th-fixed th-left">Especialidad</th>
                <th className="th-fixed">Op.</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((tr, index) => {
                let key = `tr-${index}`;
                return (
                  <tr
                    key={key}
                    id={tr.id}
                    period={tr.periodID}
                    level={tr.levelID}
                    parallel={tr.parallelID}
                    speciality={tr.speciality}
                  >
                    <td className="custom-td td-number">{index + 1}</td>
                    <td className="custom-td">{tr.level}</td>
                    <td className="custom-td">{tr.parallel}</td>
                    <td className="custom-td">{tr.year}</td>
                    <td className="custom-td">{tr.speciality}</td>
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
