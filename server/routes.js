// bring together all routes here at end
const express = require('express');
const router = express.Router();

// Import route files
// ! Example
const employeesRoute = require('./routes/employees');


// Mount routes
// ! Examples
// router.use(employeesRoute);
// router.delete('/reset', resetController.resetData);


module.exports = router;
