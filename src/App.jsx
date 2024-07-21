import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashbord from "./components/Dashbord";
import Students from "./components/Students";
import "./App.css";
import Fill from "./components/Fill";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashbord" element={<Dashbord />} />
      <Route path="/students" element={<Students />} />
      <Route path="/fill" element={<Fill />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

const NoMatch = () => {
  return <h1>Page not found</h1>;
};

export default App;
