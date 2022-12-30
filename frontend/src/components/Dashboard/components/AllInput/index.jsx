import { useEffect } from "react"
import { useState } from "react"
import { InputForm } from "./components/InputForm"
import { InputTable } from "./components/InputTable"

const AllInput = () => {
  const [results, setResults] =useState([])
  const [clicked, setClicked] =useState(false)
  useEffect(() => {

  }, [results, clicked])

  return (
    <div className='container-view'>
      <div className="form-title">Ver insumos</div>
      <InputForm setResults={setResults} clicked={clicked} setClicked={setClicked} />
      {
        (clicked && results.length > 0) && <InputTable results={results}/>
      }
      {
        (clicked && results.length === 0) && <div>No existe coincidencia con su busqueda</div>
      }
    </div>
  )
}

export { AllInput }

