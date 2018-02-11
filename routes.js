/**
 * Main application routes
 */
 
'use strict';
module.exports = function (app) {
    // Insert routes below
    app.use('/api/user', require('./controller/user'));
	app.use('/api/install', require('./controller/install'));
    //app.use('/api/job', require('./api/common'));
    //app.use('/api/payment', require('./api/user'));
};
