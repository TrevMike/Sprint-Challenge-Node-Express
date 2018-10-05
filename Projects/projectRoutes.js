const express = require('express');
const router = express.Router();
const projectDb = require('../data/helpers/projectModel');

// The Error Helper
    const errorHelper = (status, message, res) => {
        res.status(status).json({ error: message });
    };

// Router Handlers

// get info of project
router.get('/',(req,res)=>{
    projectDb
    .get()
    .then(project => {
        res.status(200).json(project);
    })
    .catch(err => {
        return errorHelper(
            500,'hey, testing this out for GET', res
        );
    });
});

router.get('/:id', (req,res)=>{
    const {id} = req.params;
    projectDb
        .get(id)
        .then(project =>{
          if(project) {
            res.status(200).json(project);
          } else {
            return errorHelper(401, 'no where to be found idk') //dont we need a res here?
          }
        })
        .catch(err => {
            return errorHelper(500, 'Server not found', res);
        });
});
// add project
router.post('/', (req, res)=> {
    const {name, description} = req.body;
    const newProject = {name, description};
    projectDb
        .insert(newProject)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            return errorHelper(500, 'server not found', res);
        });
});
// delete project
router.delete('/:id', (req, res)=> {
    const{ id } = req.params;
    projectDb
    .remove(id)
    .then(projectDeleted => {
        if(projectDeleted) {
            res.status(200).json(projectDeleted);
        } else {
            return errorHelper(400, 'no project found with that id, try again')
        }
    })
    .catch(err => {
        return errorHelper(500,'server not found', res);
    });
});
// update project
router.put('/:id', (req,res)=>{
    const { id } = req.params;
    const {name, description} = req.body;
    const updatedProject = {name, description};
    projectDb
        .update(id, updatedProject)
        .then(updatedProject => {
            if (updatedProject) {
                res.status(200).json(updatedProject);
            } else {
                return errorHelper(400,'no project found with that id, try again');
            }
        })
        .catch(err => {
            return errorHelper(500,'server not found',res);
        });
});

module.exports = router;
// description
// name