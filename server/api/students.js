const router = require('express').Router();
const { Student, Campus } = require('../db');

// GET api/students
router.get('/', async (req, res, next) => {
    try {
        const data = await Student.findAll();
        res.send(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// GET /api/students/id
router.get('/:id', async (req, res, next) => {
    try {
        const student = await Student.findByPk(req.params.id, {
            include: Campus,
        });
        //TODO: replace this with eager loading, will break component
        res.send(student);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// POST api/students
router.post('/', async (req, res, next) => {
    try {
        res.status(201).send(await Student.create(req.body));
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// DELETE api/students/id
router.delete('/:id', async (req, res, next) => {
    try {
        const student = await Student.findByPk(req.params.id);
        await student.destroy();
        res.send(student);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// PUT /api/students/id
router.put('/:id', async (req, res, next) => {
    try {
        const student = await Student.findByPk(req.params.id);
        res.send(await student.update(req.body));
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
