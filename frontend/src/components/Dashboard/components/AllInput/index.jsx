import { useEffect } from "react";
import { useState } from "react";
import { InputFormAll } from "./components/InputFormAll";
import { InputTableAll } from "./components/InputTableAll";

const AllInput = () => {
  const [results, setResults] = useState([]);
  const [clicked, setClicked] = useState(false);

  const hasData = (results) => {
    if (results.length > 0) {
      return results[0].length > 0
    }

    return false;

  }
  useEffect(() => {}, [results, clicked]);

  return (
    <div className="container-view">
      <div className="form-title">Ver insumos</div>
      <InputFormAll
        setResults={setResults}
        clicked={clicked}
        setClicked={setClicked}
      />
      {clicked && hasData(results) && (
        <InputTableAll
          results={results}
          clicked={clicked}
          setClicked={setClicked}
        />
      )}
      {clicked && !hasData(results) && (
        <div>No existe coincidencia con su busqueda</div>
      )}
    </div>
  );
};

export { AllInput };
