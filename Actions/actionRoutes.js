const express = require('express');
const router = express.Router();
const actionDb = require('../data/helpers/actionModel');
// project_id
// description
// notes

//error helpers 
const errorHelper = (status, message, res) => {
    res.status(status).json({ error: message });
};
//middleware

//routehandlers
router.get('/', (req, res)=>{
    actionDb
    .get()
    .then(actions =>{
        res.status(200).json(actions);
    })
    .catch(err => {
        return errorHelper(500,'testing this out for GET', res);
    });
});

router.get('/:id', (req, res)=>{
    const { id } = req.params;
    actionDb
        .get(id)
        .then(action => {
            if(action) {
                res.status(200),json(action);
            } else {
                return errorHelper(401,'what you are looking aint here with that id');
            }
        })
        .catch(err => {
            return errorHelper(500, 'server not found', res);
        });
});

router.post('/', (req,res)=> {
    const { project_id,description, notes} = req.body;
    const newAction = { project_id,description, notes};
    actionDb
        .insert(newAction)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            return errorHelper(500, 'server not found', res);
        });
});

router.delete('/:id', (req,res)=> {
    const { id } = req.params;
    actionDb
        .remove(id)
        .then(actionDeleted => {
            if(actionDeleted) {
                res.status(201).json(actionDeleted);
            } else {
                return errorHelper(400, 'no action with id');
            }
        })
        .catch (err => {
            return errorHelper(500,'server not found', res);
        });
});

router.put('/:id', (req,res)=>{
    const { id } = req.params;
    const { project_id,description, notes} = req.body;
    const updatedAction = { project_id,description,notes};
    actionDb
    .update(id, updatedAction)
    .then(updatedAction => {
        if(updatedAction){
            res.status(200).json(updatedAction);
        } else {
            return errorHelper(400,'no action with that ID');
        }
    })
    .catch(err =>{
        return errorHelper(500,'server not found',res);
    });
});
module.exports = router;