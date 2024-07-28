// RetrieveResume.js
import React from "react";

function RetrieveResume({
  resumeId,
  setResumeId,
  searchName,
  setSearchName,
  retrievedResumeById,
  retrievedResumesByName,
  handleSearchById,
  handleSearchByName,
}) {
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
