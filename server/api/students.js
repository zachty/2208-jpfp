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

module.exports = router;
