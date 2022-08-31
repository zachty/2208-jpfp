const router = require('express').Router();
const { Campus, Student } = require('../db');

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
        const campus = await Campus.findByPk(req.params.id, {
            include: Student,
        });
        res.send(campus);
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
router.put('/:id', async (req, res, next) => {
    try {
        const campus = await Campus.findByPk(req.params.id);
        res.send(await campus.update(req.body));
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// PUT api/campuses/id/studentId
router.put('/:id/:studentId', async (req, res, next) => {
    try {
        const oldCampus = await Campus.findByPk(req.params.id);
        await oldCampus.removeStudent(req.params.studentId);
        const campus = await Campus.findByPk(req.params.id, {
            include: Student,
        });
        res.send(campus);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
