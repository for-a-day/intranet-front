import React, { useState, useEffect } from "react";

const Drawing = () => {
  const [note, setNote] = useState("");

  useEffect(() => {
    const savedNote = localStorage.getItem("note");
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleSave = () => {
    localStorage.setItem("note", note);
    alert("Note saved!");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Note App</h1>
      <textarea
        value={note}
        onChange={handleChange}
        rows="10"
        cols="50"
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      />
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={handleSave}
          style={{ padding: "10px 20px", fontSize: "20px" }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Drawing;
