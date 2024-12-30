import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Test from "./pages/Test";
import CreateStudent from "./pages/CreateStudent";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import StudentList from "./pages/StudentList";
import CreateClassPage from "./pages/CreateClassPage";
function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<CreateClassPage />} />
          <Route path="/StudentList/:id" element={<StudentList/>} />

          <Route path="/test/:type/:classId/:id" element={<Test />} />
          <Route path="/createStudent/:id" element={<CreateStudent/>} />

        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
