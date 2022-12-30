const INPUTS_TOTAL = 5

const getAllTypes = (inputs, obj) => {
  let copy = { ...obj }
  inputs.forEach(({dni, input_id, input, average}) => {
    copy[dni].push({input_id, input, average})
  });
return copy
}

const getStudents = (students) => {
  const obj = {}
  students.forEach(std => {
    if(!obj[std.dni]) {
      obj[std.dni] = []
    }  
  });
  
  return obj
}

const organizeAverage = (inputs, students) => {
  const stds = []
  const allStudents = getStudents(students)
  const allTypes = getAllTypes(inputs, allStudents)

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


export { organizeAverage }