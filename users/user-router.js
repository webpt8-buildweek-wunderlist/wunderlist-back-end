const express = require('express');

const Users = require('./user-model.js');
const {restricted} = require('../auth/middleware.js');
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
router.get('/:user_id', restricted, (req, res) => {
    const {userId, role} = req.decodedToken;
    const {user_id} = req.params

    if(role == 'admin') {
        Users.findUserById(user_id)
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
router.put('/:user_id', restricted, (req,res) => {
    const {role} = req.decodedToken;
    const {user_id} = req.params;
    const changes = req.body;

    if(role == 'admin') {
        Users.findUserById(user_id)
            .then(user => {
                if(user) {
                    Users.updateUser(changes, user_id)
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
router.delete('/:user_id', restricted, (req, res) => {
    const {role} = req.decodedToken;
    const {user_id} = req.params;

    if(role == 'admin') {
        Users.deleteUser(user_id)
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
router.post('/:user_id/items', restricted, (req, res) => {
    const itemData = req.body;
    const {user_id} = req.params;

    Users.findUserById(user_id)
        .then(user => {
            if(user) {
                Users.addItem(itemData, user_id)
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
                message: 'Failed to create new to-do Item.'
            })
        })
});


/* ---- GET request to get all list items from a user ---- */
router.get('/:user_id/items', restricted, (req, res) => {
    const {user_id} = req.params;

    Users.findUserById(user_id)
        .then(user => {
            if(user) {
                Users.findItems(user_id)
                    .then(items => {
                        const userObj = {
                            ...user,
                            toDoItems: items
                        }
                        res.json(userObj);
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
                message: 'Failed to get to-do Items.'
            })
        })
})


/* ---- GET request to get a specific item by id ---- */
router.get('/:user_id/items/:item_id', restricted, (req, res) => {
    const {item_id} = req.params;

    Users.findItemById(item_id)
        .then(item => {
            if(item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({
                    message: 'Could not find the to-do Item with that given id.'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Failed to get to-do Item.'
            })
        })
})


/* ---- PUT request to update a item ---- */
router.put('/:user_id/items/:item_id', restricted, (req, res) => {
    const {item_id} = req.params;
    const changes = req.body;

    Users.findItemById(item_id)
        .then(item => {
            if(item) {
                Users.updateItem(changes, item_id)
                    .then(updatedItem => {
                        res.status(200).json({updatedItem})
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(417).json({
                            message: 'Required information has not been met.'
                        })
                    })
            } else {
                res.status(404).json({
                    message: 'Could not find the to-do Item with that given id.'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Failed to Update to-do Item.'
            })
        })
})


/* ---- DELETE request to delete a item ---- */
router.delete('/:user_id/items/:item_id', restricted, (req, res) => {
    const {item_id} = req.params;

    Users.deleteItem(item_id)
        .then(deletedItem => {
            if(deletedItem) {
                res.json({removed: deletedItem})
            } else {
                res.status(404).json({
                    message: 'Could not find the to-do Item with that given id.'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Failed to delete to-do Item.'
            })
        })
});




// *********************************************** //
// *****       DO DATE ITEM Request's       ****** //
// *********************************************** //


/* ---- GET request to get all do dates ---- */
router.get('/:user_id/dates', restricted, (req, res) => {
    const {user_id} = req.params;

    Users.findUserById(user_id)
        .then(user => {
            if(user) {
                Users.findDates()
                    .then(dates => {
                        const userobj = {
                            ...user,
                            doDates: dates
                        }
                        res.status(200).json(userobj);
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
                message: 'Failed to get Do Dates.'
            })
        })
});


/* ---- POST request to add an item's do date ---- */
router.post('/:user_id/items/:item_id/dates', restricted, (req, res) => {
    const dateData = req.body;
    const {user_id, item_id} = req.params;

    Users.findUserById(user_id)
        .then(user => {
            console.log(user_id);
            if(user) {
                Users.addItemToDate(dateData, item_id)
                    .then(date => {
                        res.status(201).json(date);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(417).json({
                            message: 'Required information has not been met, or the to-do item with that id does not exist.'
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
                message: 'Failed to add Item to Date.'
            })
        })
});


/* ---- GET request to get a specific item do date by id ---- */
router.get('/:user_id/dates/:date_id', restricted, (req, res) => {
    const {date_id} = req.params;

    Users.findDateById(date_id)
        .then(date => {
            if(date) {
                res.status(200).json(date);
            } else {
                res.status(404).json({
                    message: 'Could not find the do Date with that given id.'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Failed to get do Date.'
            })
        })
});


/* ---- PUT request to update an item's do date ---- */
router.put('/:user_id/dates/:date_id', restricted, (req, res) => {
    const {date_id} = req.params;
    const changes = req.body;

    Users.findDateById(date_id)
        .then(date => {
            if(date) {
                Users.updateDate(changes, date_id)
                    .then(updatedDate => {
                        res.json({updatedDate})
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(417).json({
                            message: 'Required information has not been met.'
                        })
                    })
            } else {
                res.status(404).json({
                    message: 'Could not find the do Date with that given id.'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Failed to Update do date.'
            })
        })
});


/* ---- DELETE request to delete an item's do date ---- */
router.delete('/:user_id/dates/:date_id', restricted, (req, res) => {
    const {date_id} = req.params;

    Users.deleteDate(date_id)
        .then(deletedDate => {
            if(deletedDate) {
                res.status(200).json({removed: deletedDate})
            } else {
                res.status(404).json({
                    message: 'Could not find the do Date with that given id.'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Failed to delete do Date.'
            })
        })
});


module.exports = router;