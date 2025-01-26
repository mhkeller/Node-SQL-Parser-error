const { Parser } = require("node-sql-parser");

function determineQueryType(query) {
  const opt = {
    database: "Postgresql",
  };
  const parser = new Parser();

  try {
    const ast = parser.astify(query, opt); // mysql sql grammer parsed by default
    console.log(ast);
  } catch (e) {
    console.log(e);
    console.warn("Unknown query type", query);
    return "other";
  }
}

const query = `SELECT
    gid,
    '2020-01-01 00:00:00'::TIMESTAMP WITH TIME ZONE + make_interval(secs => (
        (gid - (SELECT min(gid) FROM your_table))::NUMERIC / (SELECT max(gid) - min(gid) FROM your_table)) * 31536000
    ) AS generated_timestamp
FROM
    your_table;`;

determineQueryType(query);
