export const AverageTable = ({ averages, types }) => {
  return (
    <div className="container-table">
      <div className="outer-wrapper">
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th className="th-fixed">N°</th>
                <th className="th-fixed">Cédula</th>
                <th className="th-fixed">Alumnos</th>
                {types.map((type, i) => {
                  let key = `th-${i}`;
                  return (
                    <th key={key} className="th-fixed th-vertical">
                      {type.name}
                    </th>
                  );
                })}
                <th className="th-fixed th-vertical">Prom.</th>
              </tr>
            </thead>
            <tbody>
              {averages.map((average, i) => {
                let key = `tr-${i}`;
                let bg =
                  average.final_average >= 7 ? "average-green" : "average-red";
                return (
                  <tr className="custom-tr" key={key}>
                    <td className="td-number">{i + 1}</td>
                    <td className="custom-td td-number">{average.dni}</td>
                    <td className="custom-td">{average.name}</td>
                    {average.averages.map((average, j) => {
                      let key = `td-${j}`;
                      return (
                        <td
                          key={key}
                          title={average.input}
                          className="custom-td td-number"
                        >
                          {average.average.toFixed(2)}
                        </td>
                      );
                    })}
                    <td className={`custom-td td-number ${bg}`}>
                      {average.final_average.toFixed(2)}
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
