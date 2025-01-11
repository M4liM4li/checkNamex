const connection = require('../config/db'); // เรียกใช้การเชื่อมต่อฐานข้อมูล

exports.login = async (req, res) => {
    const { username, password } = req.body;

    console.log('Login attempt with username:', username); // แสดง username ที่ผู้ใช้กรอกมา

    if (!username || !password) {
        console.log('Missing username or password'); // หากไม่มีข้อมูลที่ต้องการ
        return res.status(400).json({
            success: false,
            message: 'กรุณากรอก username และ password'
        });
    }

    try {
        const query = 'SELECT * FROM users WHERE username = ?';
        connection.execute(query, [username], async (err, results) => {
            if (err) {
                console.error('Database error:', err); // แสดงข้อผิดพลาดหากมี
                return res.status(500).json({
                    success: false,
                    message: 'เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล'
                });
            }

            if (results.length === 0) {
                console.log(`No user found with username: ${username}`); // ถ้าไม่พบผู้ใช้
                return res.status(401).json({
                    success: false,
                    message: 'ไม่พบบัญชีผู้ใช้นี้'
                });
            }

            const user = results[0];
            const passwordMatch = user.password === password;

            if (passwordMatch) {
                console.log(`Login successful for user: ${username}`); // แสดงเมื่อเข้าสู่ระบบสำเร็จ
                req.session.userId = user.id;
                res.status(200).json({
                    success: true,
                    message: 'เข้าสู่ระบบสำเร็จ',
                    user: {
                        id: user.id,
                    }
                });
            } else {
                console.log('Incorrect password for username:', username); // เมื่อรหัสผ่านไม่ตรง
                res.status(401).json({
                    success: false,
                    message: 'รหัสผ่านไม่ถูกต้อง'
                });
            }
        });
    } catch (error) {
        console.error('Server error:', error); // แสดงข้อผิดพลาดหากเกิดข้อผิดพลาดในระบบ
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในระบบ'
        });
    }
};
