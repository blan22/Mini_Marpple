import POOL from '../../shared/db';

const findById = (id: number) => {
  return POOL.QUERY`
    SELECT *
    FROM users
    WHERE id = ${id}
  `;
};

const findByEmail = (email: string) => {
  return POOL.QUERY`
    SELECT *
    FROM users
    WHERE email = ${email}
  `;
};

export { findById, findByEmail };
