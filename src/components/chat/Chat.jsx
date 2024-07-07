import React from 'react';
import ChatIcon from '@mui/icons-material/Chat'; // Example icon from MUI
import './Chat.css';

const Chat = () => {
    const handleClick = () => {
        // 메신저 링크나 기능 추가
        alert('여따가 메신저 연동할듯?');
    };

    return (
        <div className="chat-button" onClick={handleClick}>
            <ChatIcon fontSize='100'/>
        </div>
    );
};

export default Chat;
