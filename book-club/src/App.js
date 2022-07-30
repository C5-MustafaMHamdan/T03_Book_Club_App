//importing packages
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

//import components

import { SigninPage } from "./component/Login";
import { SignupPage } from "./component/Register";  
import HomePage from "./component/Home";
import Navbari from "./component/Navbar";  
import Books from "./component/Books";
import ReadingList from "./component/Reading_List";
import Rooms from "./component/Rooms";
//styling
import "./App.css";

function App() {
  return (
  
    <div className="App">
       <Navbari />
 
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />

        <Route path="/Reading-List" element={<ReadingList />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/books" element={<Books />} />
         <Route path={"/"} element={<HomePage />} />

         <Route path="*" element={<h1>Page Was Not Found</h1>} />
      </Routes>
    </div>
 
  );
}

export default App;
