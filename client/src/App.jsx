import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [resumeDetails, setResumeDetails] = useState({
    name: '',
    job_title: '',
    job_description: '',
    job_company: '',
  });
  const [displayId, setDisplayId] = useState('');
  const [resumeId, setResumeId] = useState('');
  const [retrievedResume, setRetrievedResume] = useState(null);

  const handleChange = (e) => {
    setResumeDetails({ ...resumeDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/uploadResumeDetails', resumeDetails);
      setDisplayId(response.data.resume_id);
    } catch (error) {
      console.error('Error uploading resume:', error);
    }
  };

  const handleRetrieve = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/api/getResumeById/${resumeId}`);
      setRetrievedResume(response.data);
    } catch (error) {
      console.error('Error retrieving resume:', error);
    }
  };

  return (
    <div>
      <h1>Upload Resume</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={resumeDetails.name} onChange={handleChange} />
        </div>
        <div>
          <label>Job Title:</label>
          <input type="text" name="job_title" value={resumeDetails.job_title} onChange={handleChange} />
        </div>
        <div>
          <label>Job Description:</label>
          <input type="text" name="job_description" value={resumeDetails.job_description} onChange={handleChange} />
        </div>
        <div>
          <label>Job Company:</label>
          <input type="text" name="job_company" value={resumeDetails.job_company} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>

      {displayId && <p>Your Resume ID is: {displayId}</p>}

      <h1>Retrieve Resume</h1>
      <form onSubmit={handleRetrieve}>
        <div>
          <label>Resume ID:</label>
          <input type="text" value={resumeId} onChange={(e) => setResumeId(e.target.value)} />
        </div>
        <button type="submit">Retrieve Resume Details</button>
      </form>

      {retrievedResume && (
        <div>
          <h2>Resume Details</h2>
          <p>Name: {retrievedResume.first_name} {retrievedResume.last_name}</p>
          <p>Job Title: {retrievedResume.job_title}</p>
          <p>Job Description: {retrievedResume.job_description}</p>
          <p>Job Company: {retrievedResume.job_company}</p>
        </div>
      )}
    </div>
  );
}

export default App;
