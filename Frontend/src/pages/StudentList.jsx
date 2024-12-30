import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { LineStudent } from "../components/LineStudent";
import Modal from "../components/Modal";

export default function StudentList() {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [levelData, setLevelData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (event) => {
    navigate(event.target.value);
  };

  const handleCreateStudent = () => {
    navigate(`/createStudent/${id}`);
  };

  const handleAvg = async () => {
    // const {data} = await axios.get('')
  }

  const GoToData = async (sid) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/pastData/getPastData/${sid}`);
      console.log(sid);
      setLevelData(data.data);
      console.log(data.data);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => setModalOpen(false);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/class/getStudentsFromClassRoom/${id}`
      );
      setStudents(data.Students);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <svg
        onClick={() => navigate(`/`)}
        className="h-12 w-12 text-purple-500 cursor-pointer"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" />
      </svg>
      <button
        onClick={handleCreateStudent}
        className="rounded-xl mt-10 bg-purple-500 text-white w-[10rem] h-[2rem]"
      >
        Add Student
      </button>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid"></div>
        </nav>
        <table className="table-auto w-full mt-5">
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Level</th>
              <th>Test</th>
              <th>Show Analytics</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={index}>
                  <td>{student.rollNumber}</td>
                  <td>{student.name}</td>
                  <td>{student.level}</td>
                  <td>
                    <select onChange={handleChange} className="bg-white border border-gray-300 rounded p-2">
                      <option value="">Select Level</option>
                      <option value={`/test/Story/${id}/${student._id}`}>Story</option>
                      <option value={`/test/Paragraph/${id}/${student._id}`}>Paragraph</option>
                      <option value={`/test/Sentence/${id}/${student._id}`}>Sentence</option>
                      <option value={`/test/Word/${id}/${student._id}`}>Word</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => GoToData(student._id)}
                      className="rounded-xl bg-purple-500 text-white w-[10rem] h-[2rem]"
                    >
                      Show Data
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
        <Modal show={isModalOpen} onClose={closeModal}>
          <LineStudent data={levelData} />
        </Modal>
        <div className="flex justify-center items-center">
        <button onClick={handleAvg} classname="rounded-xl text-black bg-purple-500 w-[5rem]">Class Average</button>
        <button classname="rounded-xl text-black bg-purple-500 w-[5rem]">Class Pie</button>
        </div>
      </div>
    </div>
  );
}
