import React from "react";
import { Routes, Route } from "react-router-dom";
import Hospitals from "./Hospitals";
import Book from "./Book";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Book />} />
        <Route path="/hospital" element={<Hospitals />} />
      </Routes>
    </div>
  );
};

export default App;
