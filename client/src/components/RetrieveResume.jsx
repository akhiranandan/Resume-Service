import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const RetrieveResume = () => {
  const [retrievedResumes, setRetrievedResumes] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const handleSearchById = async (data) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/getResumeById/${data.resumeId}`
      );
      setRetrievedResumes([response.data]);
      reset();
    } catch (error) {
      console.error("Error retrieving resume:", error);
    }
  };

  const handleSearchByName = async (data) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/getResumeByName/${encodeURIComponent(data.searchName)}`
      );
      setRetrievedResumes(response.data);
      reset();
    } catch (error) {
      console.error("Error retrieving resumes:", error);
    }
  };

  const inputFields = [
    {
      label: "Resume ID:",
      name: "resumeId",
      onSubmit: handleSearchById,
      submit: "Retrieve Resume Details",
    },
    {
      label: "Resume Name:",
      name: "searchName",
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
            <form onSubmit={handleSubmit(item.onSubmit)}>
              <div>
                <label>{item.label}</label>
                <input
                  type="text"
                  {...register(item.name)}
                />
              </div>
              <button type="submit">{item.submit}</button>
            </form>
          </div>
        ))}
      </div>

      {retrievedResumes.length > 0 && (
        <div>
          <h2>Resume Details</h2>
          {retrievedResumes.map((resume) => (
            <div key={resume.id}>
              <p>
                Name: {resume.first_name} {resume.last_name}
              </p>
              <p>Job Title: {resume.job_title}</p>
              <p>Job Description: {resume.job_description}</p>
              <p>Job Company: {resume.job_company}</p>
              {retrievedResumes.length > 1 && <hr />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RetrieveResume;
