import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/Home.module.css";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const userId = JSON.parse(sessionStorage.getItem("user")).id;
      const response = await fetch(`http://check-namex-server.vercel.app/api/users/${userId}`);
      const data = await response.json();

      if (data.success) {
        setUserInfo(data.user);
        sessionStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const userId = JSON.parse(sessionStorage.getItem("user")).id;
      const response = await fetch(
        `http://check-namex-server.vercel.app/api/attendance/${userId}`
      );
      const data = await response.json();

      if (data.success) {
        setAttendanceRecords(data.attendanceRecords);
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem("user");

    if (user) {
      setUserInfo(JSON.parse(user));

      // ดึงข้อมูลผู้ใช้และข้อมูลการเช็คชื่อ
      fetchUserData();
      fetchAttendanceData();

      // ตั้ง Interval เพื่อดึงข้อมูลทุก 10 วินาที
      const interval = setInterval(() => {
        fetchUserData();
        fetchAttendanceData();
      }, 3000);

      // ล้าง Interval เมื่อคอมโพเนนต์ถูกถอดออก
      return () => clearInterval(interval);
    } else {
      // ถ้าไม่มีข้อมูลผู้ใช้ ให้เปลี่ยนเส้นทางไปที่หน้า Login
      navigate("/login");
    }
  }, [navigate]);

  if (!userInfo) {
    return (
      <div className="container">
        <div className="content">
          <p>กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.question}>
          <img src={`/assets/${userInfo.image}`} alt="User profile" />
        </div>
        <h2 style={{ color: "#16FF0A" }}>{userInfo.fullname}</h2>
        <h3 style={{ color: "#FF0A0E" }}>แผนกเทคโนโลยีสารสนเทศ</h3>

        <div className={style.attendance}>
          {attendanceRecords.length > 0 ? (
            <ul>
              {attendanceRecords.map((data) => (
                <li key={data.attendanceId}>
                  <h2>{
                  data.status === 'present'
                    ? "เข้าแถว"
                    : "ยังไม่เช็คชื่อ"}</h2>
                  <h4>เวลา: {data.time}</h4>
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีข้อมูลการเช็คชื่อ</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
