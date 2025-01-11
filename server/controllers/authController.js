const connection = require('../config/db'); // เรียกใช้การเชื่อมต่อฐานข้อมูล

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'กรุณากรอก username และ password'
        });
    }

    try {
        const query = 'SELECT * FROM users WHERE username = ?';
        connection.execute(query, [username], async (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    success: false,
                    message: 'เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล'
                });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: 'ไม่พบบัญชีผู้ใช้นี้'
                });
            }

            const user = results[0];
            const passwordMatch = user.password === password;

            if (passwordMatch) {
                req.session.userId = user.id;
                res.status(200).json({
                    success: true,
                    message: 'เข้าสู่ระบบสำเร็จ',
                    user: {
                        id: user.id,
                        role:user.role
                    }
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: 'รหัสผ่านไม่ถูกต้อง'
                });
            }
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในระบบ'
        });
    }
};
