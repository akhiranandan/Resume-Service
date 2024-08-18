import React, { useState } from "react";
import axios from "axios";
import "./App.css";
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

  const fields = [
    { name: "name", label: "Name", isRequired: true },
    { name: "job_title", label: "Job Title", isRequired: true },
    { name: "job_description", label: "Job Description", isRequired: true },
    { name: "job_company", label: "Job Company", isRequired: true },
  ];

  const onSubmit = async (data) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);
  
    if (currentStep < fields.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/uploadResumeDetails",
          updatedFormData 
        );
        setDisplayId(response.data.resume_id);
        setError("");
        reset(); 
      } catch (error) {
        setError("Error uploading resume: " + error.message);
      }
    }
  };
  

//   const handleClear = () => {
//     reset();
//     setDisplayId("");
//     setError("");
//   };

//   return (
//     <div>
//       <h1>Upload Resume</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {fields.map((item) => (
//           <Input
//             key={item.name}
//             label={item.label}
//             name={item.name}
//             register={register}
//             isRequired={item.isRequired}
//           />
//         ))}
//         <button type="submit">Submit</button>
//         <button type="button" onClick={handleClear}>
//           Clear
//         </button>
//       </form>

//       {error && <p className="error">{error}</p>}
//       {displayId && <p>Your Resume ID is: {displayId}</p>}

//       <RetrieveResume />
//     </div>
//   );
// };

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: initialResumeDetails,
      });
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});



  const handleClear = () => {
    reset();
    setFormData({});
    setCurrentStep(0);
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.slice(currentStep, currentStep + 1).map((item) => (
          <div key={item.name}>
            <label>{item.label}</label>
            <input
              {...register(item.name, { required: item.isRequired })}
              defaultValue={formData[item.name] || ""}
            />
            {errors[item.name] && <p>{item.label} is required</p>}
          </div>
        ))}
        <div>
          {currentStep > 0 && (
            <button type="button" onClick={goToPreviousStep}>
              Previous
            </button>
          )}
          {currentStep < fields.length - 1 ? (
            <button type="submit">Next</button>
          ) : (
            <button type="submit">Submit</button>
          )}
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>

      {currentStep === fields.length && (
        <div>
          <h2>Submitted Data:</h2>
          {Object.entries(formData).map(([key, value]) => (
            <p key={key}>
              {key}: {value}
            </p>
          ))}
        </div>
      )}

          {error && <p className="error">{error}</p>}
           {displayId && <p>Your Resume ID is: {displayId}</p>}
      <RetrieveResume />
    </div>
  );
}

export default App;
