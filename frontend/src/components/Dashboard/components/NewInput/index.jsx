import { useState } from "react";
import { InputForm } from "./components/InputForm";

const NewInput = () => {
  const [clicked, setClicked] = useState(false)
  return (
    <div className="container-view">
      <div className="form-title">Nuevo insumo</div>
      <InputForm clicked={clicked} setClicked={setClicked}/>
    </div>
  );
};

export { NewInput };
