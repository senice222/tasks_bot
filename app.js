const mongoose = require('mongoose');
const startServer = require('./server');
const initBot = require('./bot')

mongoose.connect('mongodb://localhost:27017/Tasks', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('[Tasks] MongoDB connected successfully!');
        startServer(3000);
        initBot()
    })
    .catch(error => {
        console.error('[Tasks] Fatal error occurred while connecting to MongoDB:', error);
    });

process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('Closed connection with MongoDB successfully');
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
    } finally {
        process.exit();
    }
});