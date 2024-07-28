import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Input from "./components/Input";
import RetrieveResume from "./components/RetrieveResume";

function App() {
  const [resumeDetails, setResumeDetails] = useState({
    name: "",
    job_title: "",
    job_description: "",
    job_company: "",
  });
  const [displayId, setDisplayId] = useState("");
  const [resumeId, setResumeId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [retrievedResumeById, setRetrievedResumeById] = useState(null);
  const [retrievedResumesByName, setRetrievedResumesByName] = useState([]);

  const fields = [
    { name: "name", label: "Name", isRequired: true },
    { name: "job_title", label: "Job Title", isRequired: true },
    { name: "job_description", label: "Job Description", isRequired: true },
    { name: "job_company", label: "Job Company", isRequired: true },
  ];

  const handleChange = (e) => {
    setResumeDetails({ ...resumeDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/uploadResumeDetails",
        resumeDetails
      );
      setDisplayId(response.data.resume_id);
    } catch (error) {
      console.error("Error uploading resume:", error);
    }
  };

  const handleSearchById = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/api/getResumeById/${resumeId}`
      );
      setRetrievedResumeById(response.data);
      setRetrievedResumesByName([]); 
    } catch (error) {
      console.error("Error retrieving resume:", error);
    }
  };

  const handleSearchByName = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/api/getResumeByName/${encodeURIComponent(searchName)}`
      );
      setRetrievedResumesByName(response.data);
      setRetrievedResumeById(null);
    } catch (error) {
      console.error("Error retrieving resumes:", error);
    }
  };

  return (
    <div>
      <h1>Upload Resume</h1>
      <form onSubmit={handleSubmit}>
        {fields.map((item) => (
          <Input
            key={item.name}
            label={item.label}
            value={resumeDetails[item.name]}
            name={item.name}
            handleChange={handleChange}
          />
        ))}
        <button type="submit">Submit</button>
      </form>

      {displayId && <p>Your Resume ID is: {displayId}</p>}

      <RetrieveResume
        resumeId={resumeId}
        setResumeId={setResumeId}
        searchName={searchName}
        setSearchName={setSearchName}
        retrievedResumeById={retrievedResumeById}
        retrievedResumesByName={retrievedResumesByName}
        handleSearchById={handleSearchById}
        handleSearchByName={handleSearchByName}
      />
    </div>
  );
}

export default App;
