const connection = require('../config/db');

exports.getAttendanceById = async (req, res) => {
    const userId = req.params.id;
    
    try {
        const query = 'SELECT * FROM attendance LEFT JOIN users ON attendance.userid = users.id WHERE attendance.userid = ?';
        connection.execute(query, [userId], (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล'
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'ไม่พบผู้ใช้'
                });
            }

            const user = results[0];
            res.status(200).json({
                success: true,
                attendanceRecords: results.map(data => ({
                    attendanceId: data.id,
                    status: data.status,
                    date: data.date,
                    time: data.time,
                }))
            });
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในระบบ'
        });
    }
};