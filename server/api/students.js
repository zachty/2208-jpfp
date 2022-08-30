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
        const campus = student.getCampus();
        const data = { student, campus };
        res.send(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
