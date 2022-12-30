const generateInsertSQL = (input, data, note) => {
  let values = [];
  data.forEach((std, i) => {
    let student = std.id
    let array = [input, student, note]
    values.push(array)
  });

  return values;
};

const generateUpdateSQL = (data, table) => {
  let queries = [];
  data.forEach((note, i) => {
    let query = `UPDATE ${table} SET qualification=${note.qualification} WHERE id=${note.id}`

    queries.push(query)
  });

  return queries;
};

module.exports = { generateInsertSQL, generateUpdateSQL };
