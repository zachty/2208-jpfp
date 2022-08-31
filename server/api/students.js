const router = require('express').Router();
const { Student } = require('../db');

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
        const student = await Student.findByPk(req.params.id);
        const campus = await student.getCampus();
        const data = { student, campus };
        res.send(data);
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
        const student = await Student.update(req.body, {
            where: { id: req.params.id },
        });
        res.send(student);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
