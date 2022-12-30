import { useEffect } from "react"
import { useState } from "react"
import { InputFormAll } from "./components/InputFormAll"
import { InputTableAll } from "./components/InputTableAll"

const AllInput = () => {
  const [results, setResults] =useState([])
  const [clicked, setClicked] =useState(false)
  useEffect(() => {

  }, [results, clicked])

  return (
    <div className='container-view'>
      <div className="form-title">Ver insumos</div>
      <InputFormAll setResults={setResults} clicked={clicked} setClicked={setClicked} />
      {
        (clicked && results.length > 0) && <InputTableAll results={results}/>
      }
      {
        (clicked && results.length === 0) && <div>No existe coincidencia con su busqueda</div>
      }
    </div>
  )
}

export { AllInput }

