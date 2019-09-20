const express = require('express');

const Users = require('./user-model.js');
const restricted = require('../auth/restricted-middleware.js');
const router = express.Router();


// *********************************************** //
// *****           USER Request's           ****** //
// *********************************************** //


/* ---- GET request for 'admin' to get all restricted Users ---- */
router.get('/', restricted, (req, res) => {
    // console.log('decoded', req.decodedToken);
    const {userId, role} = req.decodedToken;

    if(role == 'admin') {
        Users.findUsers()
            .then(users => {
                res.json(users);
            })
            .catch(err => res.status(500).send(err));
    } else {
        Users.findUserById(userId)
            .then(user => {
                res.json(user);
            })
            .catch(err => res.status(500).send(err));
    }
});


/* ---- GET request for a Specific User by id ---- */
router.get('/:id', restricted, (req, res) => {
    const {userId, role} = req.decodedToken;
    const {id} = req.params

    if(role == 'admin') {
        Users.findUserById(id)
            .then(user => {
                if(user) {
                    res.json(user);
                } else {
                    res.status(404).json({
                        message: 'Could not find the User with that given id.'
                    })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'Failed to get User.'
                })
            })
    } else {
        Users.findUserById(userId)
            .then(user => {
                res.json(user);
            })
            .catch(err => res.status(500).send(err));
    }
});


/* ---- PUT request to update User info ---- */
router.put('/:id', restricted, (req,res) => {
    const {role} = req.decodedToken;
    const {id} = req.params;
    const changes = req.body;

    if(role == 'admin') {
        Users.findUserById(id)
            .then(user => {
                if(user) {
                    Users.updateUser(changes, id)
                        .then(updatedUser => {
                            res.json(updatedUser);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(417).json({
                                message: 'Required information has not been met.'
                            })
                        })
                } else {
                    res.status(404).json({
                        message: 'Could not find the User with that given id.'
                    })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'Failed to Update User.'
                })
            })
    } else {
        res.json({
            message: 'Non Admin Request Denied'
        })
    }
});


/* ---- DELETE request to delete User ---- */
router.delete('/:id', restricted, (req, res) => {
    const {role} = req.decodedToken;
    const {id} = req.params;

    if(role == 'admin') {
        Users.deleteUser(id)
            .then(deletedUser => {
                if(deletedUser) {
                    res.json({removed: deletedUser})
                } else {
                    res.status(404).json({
                        message: 'Could not find the User with that given id.'
                    })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'Failed to delete User.'
                })
            })
    } else {
        res.json({
            message: 'Non Admin Request Denied'
        })
    }
});





// *********************************************** //
// *****        TO-DO ITEM Request's        ****** //
// *********************************************** //


/* ---- POST request to add list item ---- */
router.post('/:id/items', (req, res) => {
    const itemData = req.body;
    const {id} = req.params;

    Users.findUserById(id)
        .then(user => {
            console.log(id);
            if(user) {
                Users.addItem(itemData, id)
                    .then(item => {
                        res.status(201).json(item);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(417).json({
                            message: 'Required information has not been met.'
                        })
                    })
            } else {
                res.status(404).json({
                    message: 'Could not find the User with that given id.'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Failed to create new Item.'
            })
        })
});


/* ---- GET request to get all list items from a user ---- */
router.get('/:id/items', (req, res) => {
    const {id} = req.params;

    Users.findUserById(id)
        .then(user => {
            if(user) {
                Users.findItems()
                    .then(items => {
                        res.json(items);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                res.status(404).json({
                    message: 'Could not find the User with that given id.'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Failed to get Items.'
            })
        })
})


/* ---- GET request to get a specific item by id ---- */
router.get('/:id/items/:id', (req, res) => {
    const {id} = req.params;

    Users.findItemById(id)
        .then(item => {
            if(item) {
                res.json(item);
            } else {
                res.status(404).json({
                    message: 'Could not find the Item with that given id.'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Failed to get Item.'
            })
        })
})


/* ---- PUT request to update a item ---- */
router.put('/:id/items/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    Users.findItemById(id)
        .then(item => {
            if(item) {
                Users.updateItem(changes, id)
                    .then(updatedItem => {
                        res.json({updatedItem})
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(417).json({
                            message: 'Required information has not been met.'
                        })
                    })
            } else {
                res.status(404).json({
                    message: 'Could not find the User with that given id.'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Failed to Update Item.'
            })
        })
})


/* ---- DELETE request to delete a item ---- */
router.delete('/:id/items/:id', (req, res) => {
    const {id} = req.params;

    Users.deleteItem(id)
        .then(deletedItem => {
            if(deletedItem) {
                res.json({removed: deletedItem})
            } else {
                res.status(404).json({
                    message: 'Could not find the Item with that given id.'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Failed to delete Item.'
            })
        })
});

module.exports = router;