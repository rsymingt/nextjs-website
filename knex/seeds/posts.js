/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {id: 1, name: 'Hettie Marshall', email: 'lantunde@acbo.va'},
  ]);
};
