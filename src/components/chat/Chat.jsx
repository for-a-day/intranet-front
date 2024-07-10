import React, { useState, useEffect } from "react";
import ChatIcon from "@mui/icons-material/Chat"; // Example icon from MUI
import "./Chat.css";
import instance from "../../axiosConfig";

const Chat = () => {
  const [employeeId, setEmployeeId] = useState("");

    useEffect(() => {
        const fetchEmployeeId = async () => {
            try {
                const response = await instance.get("app/employees/current");
                setEmployeeId(response.data.id); // 현재 사용자 ID 설정
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchEmployeeId();
    }, []);

    const handleClick = () => {
        // 메신저 링크나 기능 추가
        const chatUrl = `http://localhost:3005?employeeId=${employeeId}`;
        window.open(chatUrl, "_blank", "width=800,height=800,top=500,left=0,toolbar=no,location=no");

    };

    fetchEmployeeId();
  }, []);

  const handleClick = () => {
    const chatUrl = `http://localhost:3005?employeeId=${employeeId}`;
    window.open(chatUrl, "_blank", "width=800,height=800,top=500,left=0,toolbar=no,location=no");
  };

  return (
    <div className="chat-button" onClick={handleClick}>
      <ChatIcon fontSize="large" />
    </div>
  );
};

export default Chat;
