import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
const TodayNote = () => {
  const [note, setNote] = useState("");
  useEffect(() => {
    const savedNote = Cookies.get("note");
    if (savedNote) {
      const { value, expiry } = JSON.parse(savedNote);
      if (new Date().getTime() > expiry) {
        Cookies.remove("note");
      } else {
        setNote(value);
      }
    }
  }, []);
  const handleChange = (e) => {
    setNote(e.target.value);
  };
  const handleSave = () => {
    const now = new Date();
    const item = {
      value: note,
      expiry: now.getTime() + 24 * 60 * 60 * 1000, // 24 hours from now
    };
    Cookies.set("note", JSON.stringify(item), { expires: 1 }); // Expires in 1 day
    alert("Note saved!");
  };
  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>MEMO</h1>
        <button onClick={handleSave} style={styles.button}>
          Save
        </button>
      </div>
      <div style={styles.textareaContainer}>
        <textarea
          value={note}
          onChange={handleChange}
          rows="10"
          style={styles.textarea}
          placeholder="Write your note here..."
        />
      </div>
    </div>
  );
};
const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  header: {
    fontSize: "24px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  textareaContainer: {
    marginBottom: "2px",
  },
  textarea: {
    width: "100%",
    fontSize: "16px",
    lineHeight: "1.6",
    border: "none",
    borderRadius: "5px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
    resize: "none",
    minHeight: "200px",
  },
};
export default TodayNote;
