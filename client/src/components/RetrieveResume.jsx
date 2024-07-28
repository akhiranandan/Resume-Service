const RetrieveResume = ({
  resumeId,
  setResumeId,
  searchName,
  setSearchName,
  retrievedResumeById,
  retrievedResumesByName,
  handleSearchById,
  handleSearchByName,
}) => {
    return(
    <div>
      <h1>Retrieve Resume</h1>

      <div className="search-resume">
        <div className="search-with-id">
          <form onSubmit={handleSearchById}>
            <div>
              <label>Resume ID:</label>
              <input
                type="text"
                value={resumeId}
                onChange={(e) => setResumeId(e.target.value)}
              />
            </div>
            <button type="submit">Retrieve Resume Details</button>
          </form>
        </div>

        <div className="search-with-name">
          <form onSubmit={handleSearchByName}>
            <div>
              <label>Resume Name:</label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="First Name Last Name"
              />
            </div>
            <button type="submit">Retrieve Resume Details</button>
          </form>
        </div>
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
              <p>----------------------------------------------------------</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RetrieveResume;
