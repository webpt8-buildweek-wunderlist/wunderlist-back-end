exports.up = function(knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments();
            tbl.string('username', 128).notNullable().unique();
            tbl.string('password', 128).notNullable();
            tbl.string('role', 128).notNullable().defaultTo('user');
            tbl.timestamp('created_at').defaultTo(knex.fn.now());
        })
        .createTable('list_items', tbl => {
            tbl.increments();
            tbl.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
            tbl.string('item_name', 128).notNullable().unique();
            tbl.text('item_description').notNullable();
            tbl.timestamp('created_at').defaultTo(knex.fn.now());
        })
        .createTable('item_do_date', tbl => {
            tbl.increments();
            tbl.integer('item_id').unsigned().notNullable().references('id').inTable('list_items').onDelete('CASCADE').onUpdate('CASCADE');
            tbl.string('do_date', 12).notNullable();
            tbl.string('do_time', 12);
            tbl.boolean('completed').notNullable().defaultTo(false);
        });
};
  
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('item_do_date')
        .dropTableIfExists('list_items')
        .dropTableIfExists('users');
};