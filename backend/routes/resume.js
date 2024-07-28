// routes/resume.js
const express = require('express');
const pool = require('../db');
const router = express.Router();

router.post('/uploadResumeDetails', async (req, res) => {
  const { name, job_title, job_description, job_company } = req.body;

  if (!name || !job_title || !job_description || !job_company) {
    return res.status(400).json({ error: 'Bad request: Missing fields' });
  }

  const [first_name, last_name] = name.split(' ');

  try {
    const result = await pool.query(
      'INSERT INTO resumes (first_name, last_name, job_title, job_description, job_company) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [first_name, last_name, job_title, job_description, job_company]
    );
    res.status(200).json({ resume_id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
});

router.get('/getResumeById/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM resumes WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
});

router.get('/getResumeByName/:name', async (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const [first_name, last_name] = name.split(' ');

  if (!first_name || !last_name) {
    return res.status(400).json({ error: 'Bad request: Invalid name format' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM resumes WHERE first_name = $1 OR last_name = $2',
      [first_name, last_name]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No resumes found' });
    }

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
});

module.exports = router;
