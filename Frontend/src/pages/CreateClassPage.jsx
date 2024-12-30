import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateClassPage = () => {
  const navigate = useNavigate();
  const [classesName, setClassesName] = useState("");
  const [classes, setClasses] = useState([]);
  const fetchClasses = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/class/getClassRooms"
      );
      console.log(data);
      setClasses(data.classes);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchClasses();
  }, []);
  const createClass = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/class/createClassRoom",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: classesName }),
        }
      );
      if (!response.ok) {
        throw new Error("Error creating class");
      }

      const data = await response.json();
      alert(data.message);
      setClassesName("");

      setClasses((prevClasses) => [...prevClasses, { name: classesName }]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClass = (id) => {
    navigate(`/studentList/${id}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9eaf7",
      }}
    >
      <h1
        className="text-purple-500"
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Create a Class
      </h1>
      <input
        type="text"
        value={classesName}
        onChange={(e) => setClassesName(e.target.value)}
        placeholder="Class name"
        style={{
          width: "300px",
          padding: "15px",
          margin: "10px 0",
          boxSizing: "border-box",
          borderRadius: "5px",
          border: "1px solid #6a097d",
        }}
      />
      <button
        className="bg-purple-500"
        onClick={createClass}
        style={{
          color: "white",
          border: "none",
          borderRadius: "20px",
          padding: "10px 20px",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold",
          width: "300px",
          marginBottom: "20px",
        }}
      >
        Create Class
      </button>
      <div className="flex justify-center items-center flex-wrap">
        {classes.length > 0 ? (
          classes.map((cls, index) => (
            <div onClick={() => handleClass(cls._id)}>
              <Card key={index} cName={cls.name} />
            </div>
          ))
        ) : (
          <p>No classes found</p>
        )}
      </div>
    </div>
  );
};

export default CreateClassPage;
