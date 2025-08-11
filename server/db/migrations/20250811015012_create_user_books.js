
export const up = async function(knex) {
    await knex.schema.createTable('user_books', (table) => {
        table.increments('id').primary();
        table.string('user_id').notNullable();
        table.string('title').notNullable();
        table.string('author');
        table.string('description');
        table.string('long_description');
        table.string('image');
        table.decimal('rating');
        table.string('url');
    });
};


export const down = async function(knex) {
    await knex.schema.dropTableIfExists('user_books');
};
