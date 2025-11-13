import pool from '../config/db.js';

export const createUser = async (name, email, password, avatarUrl) => {
  const query = `
    INSERT INTO users (name, email, password, avatar_url)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, avatar_url, status, created_at
  `;
  const values = [name, email, password, avatarUrl];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};
