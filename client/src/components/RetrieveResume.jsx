// RetrieveResume.js
import React, {useState} from "react";
import axios from "axios";

const RetrieveResume = () => {

  const [resumeId, setResumeId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [retrievedResumeById, setRetrievedResumeById] = useState(null);
  const [retrievedResumesByName, setRetrievedResumesByName] = useState([]);
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

  const inputFields = [
    {
      label: "Resume ID:",
      value: resumeId,
      onChange: (e) => setResumeId(e.target.value),
      onSubmit: handleSearchById,
      submit: "Retrieve Resume Details",
    },
    {
      label: "Resume Name:",
      value: searchName,
      onChange: (e) => setSearchName(e.target.value),
      onSubmit: handleSearchByName,
      submit: "Retrieve Resume Details",
    },
  ];
  return (
    <div>
      <h1>Retrieve Resume</h1>

      <div className="search-resume">
        {inputFields.map((item, index) => (
          <div key={index}>
            <form onSubmit={item.onSubmit}>
              <div>
                <label>{item.label}</label>
                <input
                  type="text"
                  value={item.value}
                  onChange={item.onChange}
                />
              </div>
              <button type="submit">{item.submit}</button>
            </form>
          </div>
        ))}
      </div>

      {retrievedResumeById && (
        <div>
          <h2>Resume Details</h2>
          <p>
            Name: {retrievedResumeById.first_name}{" "}
            {retrievedResumeById.last_name}
          </p>
          <p>Job Title: {retrievedResumeById.job_title}</p>
          <p>Job Description: {retrievedResumeById.job_description}</p>
          <p>Job Company: {retrievedResumeById.job_company}</p>
        </div>
      )}
      {retrievedResumesByName.length > 0 && (
        <div>
          <h2>Resumes Found:</h2>
          {retrievedResumesByName.map((resume) => (
            <div key={resume.id}>
              <p>
                Name: {resume.first_name} {resume.last_name}
              </p>
              <p>Job Title: {resume.job_title}</p>
              <p>Job Description: {resume.job_description}</p>
              <p>Job Company: {resume.job_company}</p>
              <p>---------------------------------------------------</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RetrieveResume;
