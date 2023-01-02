const { connection } = require("../sql/connection");
const { averageQueries } = require("../utils/functions/sqlQuerys");

const found = (req, res) => {
  let query = averageQueries.LOAD(req.body)

  return connection.query(query, (error, results) => {
    if (error) throw error;
    return res.status(200).json({ results });
  });
};

module.exports = { found };
