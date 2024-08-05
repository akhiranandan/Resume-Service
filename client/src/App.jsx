import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Input from "./components/Input";
import RetrieveResume from "./components/RetrieveResume";
import { useForm } from "react-hook-form";

const App = () => {
  const initialResumeDetails = {
    name: "",
    job_title: "",
    job_description: "",
    job_company: "",
  };

  const [displayId, setDisplayId] = useState("");
  const [error, setError] = useState("");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialResumeDetails,
  });

  const fields = [
    { name: "name", label: "Name", isRequired: true },
    { name: "job_title", label: "Job Title", isRequired: true },
    { name: "job_description", label: "Job Description", isRequired: true },
    { name: "job_company", label: "Job Company", isRequired: true },
  ];

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/uploadResumeDetails",
        data
      );
      setDisplayId(response.data.resume_id);
      setError("");
      reset();
    } catch (error) {
      setError("Error uploading resume: " + error.message);
    }
  };

  const handleClear = () => {
    reset();
    setDisplayId("");
    setError("");
  };

  return (
    <div>
      <h1>Upload Resume</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item) => (
          <Input
            key={item.name}
            label={item.label}
            name={item.name}
            register={register}
            isRequired={item.isRequired}
          />
        ))}
        <button type="submit">Submit</button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {displayId && <p>Your Resume ID is: {displayId}</p>}

      <RetrieveResume />
    </div>
  );
};

export default App;
