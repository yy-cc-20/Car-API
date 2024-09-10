const mysql = require('mysql2');

function connectDatabase(serverUrl, username, password, databaseName) {
    const connection = mysql.createConnection({
        host: serverUrl,
        user: username,
        password: password,
        database: databaseName
    });

    // Connect to MySQL
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            return;
        }
        console.log('Connected to the database with thread ID:', connection.threadId);
    });
}

module.exports = connectDatabase