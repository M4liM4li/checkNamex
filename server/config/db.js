const mysql = require('mysql2');

// สร้างการเชื่อมต่อฐานข้อมูล
const connection = mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com', 
    user: 'mxbMSpJeeJZzbTj.root',                           
    password: 'Ug4KmLgsQixYUZ58',                           
    database: 'project',                                    
    port: 4000,                                            
    ssl: {
        rejectUnauthorized: true                         
    }
});

// เชื่อมต่อกับฐานข้อมูล
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to database successfully!');
});

module.exports = connection;
