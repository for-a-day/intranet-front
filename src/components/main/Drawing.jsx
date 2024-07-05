import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const NoteApp = () => {
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
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Note App</h1>
      <textarea
        value={note}
        onChange={handleChange}
        rows="10"
        cols="50"
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={handleSave}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default NoteApp;
