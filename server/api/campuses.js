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

module.exports = router;
