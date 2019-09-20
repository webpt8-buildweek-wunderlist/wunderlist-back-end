const db = require('../data/dbConfig.js');

module.exports = {
    addUser,
    findUsers,
    findUserBy,
    findUserById,
    updateUser,
    deleteUser,
    addItem,
    findItems,
    findItemBy,
    findItemById,
    updateItem,
    deleteItem
};


function addUser(user) {
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findUserById(id);
        });
}

function findUsers() {
    return db('users')
        .select(
            'id',
            'username',
            'role'
        );
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
        .update(changes)
        .then(ids => {
            return findUserById(ids[0])
        })
}

function deleteUser(id) {
    return db('users')
        .where({id})
        .del();
}

function addItem(item, id) {
    return db('list_items as li')
        .join('users as u', 'li.user_id', 'u.id')
        .insert({
            item_name: item.item_name,
            item_description: item.item_description,
            user_id: id
        })
        .then(ids => {
            return findItemById(ids[0])
        })
}

function findItems() {
    return db('list_items as li')
        .join('users as u', 'li.user_id', 'u.id')
        .select(
            'li.item_name',
            'li.item_description',
            'li.completed'
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
        .then(ids => {
            return findItemById(ids[0])
        })
}

function deleteItem(id) {
    return db('list_items')
        .where({id})
        .del();
}