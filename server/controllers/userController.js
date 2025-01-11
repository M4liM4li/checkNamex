// server/controllers/userController.js
const connection = require("../config/db");

exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  console.log(`Request received to fetch user with ID: ${userId}`);

  try {
    const query = "SELECT * FROM users WHERE id = ?";
    connection.execute(query, [userId], (err, results) => {
      if (err) {
        console.error("Database connection error:", err); // Log the error
        return res.status(500).json({
          success: false,
          message: "เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล",
        });
      }

      if (results.length === 0) {
        console.log(`No user found with ID: ${userId}`); // Log if no user found
        return res.status(404).json({
          success: false,
          message: "ไม่พบผู้ใช้",
        });
      }

      const user = results[0];
      console.log(`User found: ${JSON.stringify(user)}`); // Log user data

      res.status(200).json({
        success: true,
        user: {
          id: user.id,
          stdcode: user.stdcode,
          username: user.username,
          fullname: user.fullname,
          role: user.role,
          image: user.image,
        },
      });
    });
  } catch (error) {
    console.error("Error in the system:", error); // Log the system error
    res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในระบบ",
    });
  }
};
