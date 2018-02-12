/**
 * Main application routes
 */
 
'use strict';
module.exports = function (app) {
    // Insert routes below
    app.use('/api/user', require('./controller/user'));
};
