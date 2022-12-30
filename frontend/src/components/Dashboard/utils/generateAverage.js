const INPUTS_TOTAL = 5

const updateAverages = (inputs, obj) => {  
  let copy = { ...obj }
  inputs.forEach(({dni, input_id, average}) => {
    copy[dni] = copy[dni].map(input => {
      if(input.input_id === input_id) {
        input.average = average
      }

      return input
    })
  });

return copy
}

const createAverages = (students, types) => {
  const TYPES = types.map(type => {
    return {
      input_id: type.id,
      input: type.name,
      average: 0
    }
  })

  const obj = {}
  students.forEach(std => {
    if(!obj[std.dni]) {
      obj[std.dni] = TYPES
    }  
  });
  
  return obj
}

const generateAverage = (inputs, students, types) => {
  const stds = []
  const allAverages = createAverages(students, types)
  const allTypes = updateAverages(inputs, allAverages)

  inputs.forEach(({dni, fullname}) => {
    const std = {
      dni,
      name: fullname,
      averages: allTypes[dni].sort((a, b) => a.input_id - b.input_id),
      final_average: allTypes[dni].reduce((prev, next) => {
        return prev + next.average
      }, 0) / INPUTS_TOTAL
    }

    if (stds.length === 0) {
      stds.push(std)
    } else {
      let exists = stds.filter(obj => obj.dni === dni).length > 0 
      if(!exists) stds.push(std)
    }
   
  });
  
  return stds

}


export { generateAverage }