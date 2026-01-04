const pool = require("../db/mysqlPool");

exports.findByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT id, email, password, name FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
};

exports.findById = async (id) => {
  const [rows] = await pool.query(
    "SELECT id, email, name FROM users WHERE id = ?",
    [id]
  );
  return rows[0];
};

exports.save = async ({ email, password, name }) => {
  await pool.query(
    "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
    [email, password, name]
  );
};
