import React from "react";
import { MenuItem, TextField } from "@mui/material";

// 스타일
const styles = {
  container: {
    margin: "20px auto",
    maxWidth: "1000px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  thead: {
    backgroundColor: "#f2f2f2",
  },
  th: {
    padding: "12px 15px",
    textAlign: "left",
    border: "1px solid #ddd",
    backgroundColor: "#f4f4f4",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "12px 15px",
    textAlign: "left",
    border: "1px solid #ddd",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    cursor: "pointer",
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "30px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    zIndex: "1000",
    borderRadius: "10px",
    maxWidth: "500px",
    width: "100%",
    animation: "fadeIn 0.3s ease-out",
  },
  modalContent: {
    marginBottom: "20px",
  },
  modalButtons: {
    textAlign: "right",
  },
  button: {
    marginLeft: "10px",
    padding: "8px 15px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  buttonDanger: {
    marginLeft: "10px",
    padding: "10px 15px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  delButton: {
    marginLeft: "10px",
    padding: "8px 15px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  buttonClose: {
    marginLeft: "10px",
    padding: "10px 15px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    animation: "fadeIn 0.3s ease-out",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    display: "block",
  },
  editInput: {
    marginBottom: "10px",
    width: "100%",
    marginTop: "10px",
    marginBottom: "20px",
  },
  modalTitle: {
    fontSize: "1.5rem", // 제목의 폰트 크기
    fontWeight: "bold", // 제목의 글꼴 두께
    marginBottom: "20px", // 제목 아래 여백
    color: "#333", // 제목의 글자 색상
  },
};

export default styles;
