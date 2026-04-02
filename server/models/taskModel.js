import { pool } from "../config/db.js";

/*
Design:
- ENUM used for status → ensures only valid values
- timestamps auto-managed
- due_date optional for flexibility
- All date/time fields cast to TEXT to avoid timezone conversion issues
*/

export const TaskModel = {
  getAll: async ({ status, limit, offset }) => {
    let query = `
      SELECT 
        id,
        title,
        description,
        status,
        due_date::text AS due_date,
        created_at::text AS created_at,
        updated_at::text AS updated_at
      FROM tasks
    `;

    const values = [];

    if (status) {
      values.push(status);
      query += ` WHERE status = $${values.length}`;
    }

    query += " ORDER BY created_at DESC";

    if (limit) {
      values.push(limit);
      query += ` LIMIT $${values.length}`;
    }

    if (offset) {
      values.push(offset);
      query += ` OFFSET $${values.length}`;
    }

    const { rows } = await pool.query(query, values);
    return rows;
  },

  getById: async (id) => {
    const { rows } = await pool.query(
      `
      SELECT 
        id,
        title,
        description,
        status,
        due_date::text AS due_date,
        created_at::text AS created_at,
        updated_at::text AS updated_at
      FROM tasks
      WHERE id = $1
      `,
      [id]
    );

    return rows[0];
  },

  create: async (task) => {
    const { title, description, dueDate } = task;

    const { rows } = await pool.query(
      `
      INSERT INTO tasks (title, description, due_date)
      VALUES ($1, $2, $3)
      RETURNING 
        id,
        title,
        description,
        status,
        due_date::text AS due_date,
        created_at::text AS created_at,
        updated_at::text AS updated_at
      `,
      [title, description, dueDate]
    );

    return rows[0];
  },

  update: async (id, fields) => {
    const keys = Object.keys(fields);
    const values = Object.values(fields);

    const setQuery = keys
      .map((key, i) => `${key} = $${i + 1}`)
      .join(", ");

    const { rows } = await pool.query(
      `
      UPDATE tasks 
      SET ${setQuery}, updated_at = NOW()
      WHERE id = $${keys.length + 1}
      RETURNING 
        id,
        title,
        description,
        status,
        due_date::text AS due_date,
        created_at::text AS created_at,
        updated_at::text AS updated_at
      `,
      [...values, id]
    );

    return rows[0];
  },

  delete: async (id) => {
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  }
};