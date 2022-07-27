//importing packages
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

//import components

import { SigninPage } from "./component/Login";
import { SignupPage } from "./component/Register";  
import HomePage from "./component/Home";
import Navbar from "./component/Navbar";  
import Books from "./component/Books";
//styling
import "./App.css";

function App() {
  return (
  
    <div className="App">
       <Navbar />
 
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />

       
        <Route path="/books" element={<Books />} />
         <Route path={"/"} element={<HomePage />} />

         <Route path="*" element={<h1>Page Was Not Found</h1>} />
      </Routes>
    </div>
 
  );
}

export default App;
