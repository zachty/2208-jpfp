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

// DELETE api/campuses/id
router.delete('/:id', async (req, res, next) => {
    try {
        const campus = await Campus.findByPk(req.params.id);
        await campus.destroy();
        res.send(campus);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// PUT api/campuses/id
router.put('/:id', (req, res, next) => {
    try {
        const campus = await Campus.update(req.body, {where: {id: req.params.id}})
        res.send(campus)
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;
