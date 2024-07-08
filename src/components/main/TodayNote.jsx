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
    <>
      <Box>
        <Typography
          sx={{ fontWeight: "bold", fontSize: "h3.fontSize", marginBottom: "0", pl: 5, pt: 4 }}
          gutterBottom
        >
          MEMO
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "325px",
          p: 1,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            mb: 2,
            p: 2,
            position: "relative",
            backgroundColor: "#fffaae",
          }}
        >
          <CardContent>
            {Array.from({ length: 15 }).map((_, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", position: "relative", height: "40px" }}
              >
                <Divider sx={{ position: "absolute", width: "100%" }} />
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "right",
                    left: 0,
                    zIndex: 1,
                    mb: 4,
                    width: "100%",
                  }}
                >
                  {messages[index] || ""}
                  {messages[index] && (
                    <IconButton onClick={() => handleDelete(index)} sx={{ ml: 1 }}>
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
          />
          <Button onClick={handleSend} variant="contained" color="primary" sx={{ ml: 2 }}>
            Send
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ChatNote;
