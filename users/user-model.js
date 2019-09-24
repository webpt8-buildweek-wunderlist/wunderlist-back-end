const db = require('../data/dbConfig.js');

module.exports = {
    // Users //
    addUser,
    findUsers,
    findUserBy,
    findUserById,
    updateUser,
    deleteUser,
    // Items //
    addItem,
    findItems,
    findItemBy,
    findItemById,
    updateItem,
    deleteItem,
    // Dates //
    addItemToDate,
    findDates,
    findDateById,
    updateDate,
    deleteDate
};


// *********************************************** //
// *****                USER                ****** //
// *********************************************** //

async function addUser(user) {
    const [id] = await db('users')
        .insert(user, 'id')
        .returning('id');

        return findUserById(id);
}

function findUsers() {
    return db('users')
}

function findUserBy(filter) {
    return db('users')
        .where(filter);
}

function findUserById(id) {
    return db('users')
        .where({ id })
        .first();
}

function updateUser(changes, id) {
    return db('users')
        .where({id})
        .update(changes, '*')
        .returning('id')
}

function deleteUser(id) {
    return db('users')
        .where({id})
        .del();
}


// *********************************************** //
// *****               ITEMS                ****** //
// *********************************************** //

function addItem(item, id) {
    return db('list_items as li')
        .join('users as u', 'li.user_id', 'u.id')
        .insert({
            item_name: item.item_name,
            item_description: item.item_description,
            user_id: id
        })
        .returning('id')
        .then(ids => {
            return findItemById(ids[0])
        })
}

function findItems(id) {
    return db('list_items as li')
        .join('users as u', 'li.user_id', 'u.id')
        .where({
            user_id: id
        })
        .select(
            'li.id',
            'li.item_name',
            'li.item_description'
        );
}

function findItemBy(filter) {
    return db('list_items')
        .where(filter)
}

function findItemById(id) {
    return db('list_items')
        .where({id})
        .first();
}

function updateItem(changes, id) {
    return db('list_items')
        .where({id})
        .update(changes)
        .returning('id')
        
}

function deleteItem(id) {
    return db('list_items')
        .where({id})
        .del();
}


// *********************************************** //
// *****                DATES               ****** //
// *********************************************** //

function addItemToDate(date, id) {
    return db('item_do_date as idd')
        .join('list_items as li', 'idd.list_item_id', 'li.id')
        .insert({
            list_item_id: id,
            do_date: date.do_date,
            do_time: date.do_time
        })
        .returning('id')
        .then(ids => {
            return findDateById(ids[0])
        })
}

function findDates(id) {
    return db('item_do_date as idd')
        .join('list_items as li', 'idd.list_item_id', 'li.id')
        .join('users as u', 'li.user_id', 'u.id')
        .where({
            user_id: id
        })
        .select(
            'idd.id',
            'li.item_name',
            'li.item_description',
            'idd.do_date',
            'idd.do_time',
            'idd.completed',
            'li.created_at'
        );
}

function findDateById(id) {
    return db('item_do_date')
        .where({id})
        .first();
}

function updateDate(changes, id) {
    return db('item_do_date')
        .where({id})
        .update(changes, '*')
        .returning('id')
}

function deleteDate(id) {
    return db('item_do_date')
        .where({id})
        .del();
}