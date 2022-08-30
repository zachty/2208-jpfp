const router = require('express').Router();
const { Campus } = require('../db');

// GET api/campuses
router.get('/', async (req, res, next) => {
    try {
        const data = await Campus.findAll();
        res.send(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// GET api/campuses/id
router.get('/:id', async (req, res, next) => {
    try {
        const campus = await Campus.findByPk(req.params.id);
        const students = await campus.getStudents();
        const data = { campus, students };
        res.send(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// POST api/campuses
router.post('/', async (req, res, next) => {
    try {
        res.status(201).send(await Campus.create(req.body));
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
