import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";

const ChatNote = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const savedMessages = Cookies.get("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim() !== "") {
      const newMessages = [...messages, message];
      setMessages(newMessages);
      Cookies.set("chatMessages", JSON.stringify(newMessages), { expires: 1 });
      setMessage("");
    }
  };

  const handleDelete = (index) => {
    const newMessages = messages.filter((_, i) => i !== index);
    setMessages(newMessages);
    Cookies.set("chatMessages", JSON.stringify(newMessages), { expires: 1 });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box>
      <Box>
        <Typography variant="h4" component="div" sx={{ mb: 1, mt: 3, ml: 3, fontWeight: "600" }}>
          오늘의 메모
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "331px",
          p: 1,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            mb: 1,
            p: 1,
            position: "relative",
            backgroundColor: "#f2f2f2",
          }}
        >
          <CardContent>
            {Array.from({ length: 15 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  height: "40px",
                  lineHeight: "40px",
                }}
              >
                <Divider sx={{ position: "absolute", width: "100%" }} />
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "left",
                    left: 0,
                    zIndex: 1,
                    mb: 3.5,
                    width: "100%",
                  }}
                >
                  {messages[index] || ""}
                  {messages[index] && (
                    <IconButton onClick={() => handleDelete(index)} sx={{ ml: 0, mb:1 }}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            value={message}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            onKeyPress={handleKeyPress}
            placeholder="메모를 입력하세요"
            size="small"
          />
          <Button onClick={handleSend} variant="contained" color="primary" sx={{ ml: 2 }}>
            <ModeIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatNote;
