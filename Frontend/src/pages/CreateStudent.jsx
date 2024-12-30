import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const CreateStudent = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [rollNumber, setrollNumber] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:3000/api/student/createStudent/${id}`,
        {
          name,
          rollNumber,
        }
      );
      if (data.success) {
        toast.success("Student created successfully");
        navigate(`/studentList/${id}`);
      } else {
        console.log(data.error);
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Error creating student");
      console.log(error);
    }
  };

  return (
    <dic className="flex flex-col pt-10 gap-10 items-center w-full h-[90vh]">
      <svg
        onClick={() => navigate(`/studentList/${id}`)}
        class="h-12 w-12 text-purple-500"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        {" "}
        <path stroke="none" d="M0 0h24v24H0z" />{" "}
        <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" />
      </svg>

      <h2 className="text-3xl font-semibold text-purple-400">
        Add New Student to Class
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-1/3 flex flex-col gap-3 justify-center items-center"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 border border-purple-500 p-2 h-[2rem] block w-full rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />

        <input
          type="text"
          placeholder="rollNumber"
          value={rollNumber}
          onChange={(e) => setrollNumber(e.target.value)}
          required
          className="mt-1 block w-full p-2 border h-[2rem] border-purple-500 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
        />
        <button
          type="submit"
          className="mt-4 w-1/2 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Submit
        </button>
      </form>
    </dic>
  );
};

export default CreateStudent;
