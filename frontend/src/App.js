import React from "react";
import Pages from './Pages/Pages'
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </>
  );
};

export default App;
