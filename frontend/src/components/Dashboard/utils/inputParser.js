const parseInputs = (inputs, students) => {
  return students.map(({id, dni, name, lastname}) => {
    let fullname = `${name} ${lastname}`;
    let notes = inputs.filter((input) => input.student === id);
    notes = [...notes].map((note) => {
      note.qualification = note.qualification.toFixed(2).replaceAll(",", ".");
      return note;
    });

    let media = notes.reduce((prev, next) => {
      return prev + parseFloat(next.qualification);
    }, 0);

    return {
      user: { id, dni, name: fullname },
      inputs: notes,
      media: (media / notes.length).toFixed(2).replace(",", "."),
    };
  });
};

const generateArrayTD = (inputData, inputs) => {
  let theads = [];
  inputs.forEach((input, i) => {
    let obj = {
      thID: input.input,
      date: input.date,
      description: input.description,
    }
    
    if(theads.length === 0){
      theads.push(obj)
    } else {
      let exists = theads.filter((reg) => reg.thID === input.input).length
      if (!exists) {
        theads.push(obj)
      }
    }
  });

  let disabled = {};
  theads.map((th, i) => {
    if (!disabled[th.thID]) disabled[th.thID] = true;
    th.name = `Insumo ${i + 1}`
    return th
  })

  return {
    theads:theads,
    disabled
  };
};

export { parseInputs, generateArrayTD };
