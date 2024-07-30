# Resume Service Application

> This is a simple web application that allows users to upload and retrieve resume details. The backend is built with Node.js, Express, and PostgreSQL, while the frontend is created using React.

## Features

- Users can upload resume details including name, job title, job description, and company.
- Users can retrieve resume details using a unique resume ID.
- Users can search for resumes by entering the candidate's name.

## Technologies Used

- Backend: NodeJS, ExpressJS
- Database: PostgreSQL
- Frontend: JavaScript, ReactJS

## Demo Video (LooM)
https://www.loom.com/share/5c56a948f1324a43af4fb72a1a4f0c48?sid=e88d323f-e737-480f-9a50-8141d876a377

## Installation

1. Clone the repository:

```
git clone https://github.com/akhiranandan/Resume-Service.git
```

2. Navigate to the backend:

```
cd Resume-Service/backend
```

3. Install dependencies:

```
npm install
```

4. Set up the PostgreSQL database:
   Create a new PostgreSQL database.
   Update the config.js file with your database credentials.
   Create the resumes table:
```
CREATE TABLE resumes (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    job_title VARCHAR(100),
    job_description TEXT,
    job_company VARCHAR(100)
);

```
5. Run the backend server:

```
npm start
```
The backend server will start on http://localhost:8080.

6. Go back and Navigate to the frontend directory:

```
cd ..
cd client
```

7. Install dependencies:

```
npm install
```

8. Run the frontend application:

```
npm run dev
```
