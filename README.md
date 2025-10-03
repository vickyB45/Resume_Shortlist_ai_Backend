# Resume Sortlisting Website (Backend)

This is the **backend** of the Resume Sortlisting Website.  
It handles **resume uploads, analysis, and result storage** in the database. Built with **Node.js**, **Express**, **MongoDB**, and **Multer** for file uploads.

---

## Features

- **Resume Upload**
  - Accepts PDF files via `multipart/form-data`
  - Stores files on the server or cloud storage
- **Job Description**
  - Accepts job description text along with resume
- **Resume Analysis**
  - Processes resume and job description
  - Returns **score**, **feedback**, **shortlisted status**, and other details
- **API Endpoints**
  - `/resume/upload` → Upload resume and job description
  - `/resume/result/:id` → Get analysis result for a specific resume
- **User Management** (if implemented)
  - Simple authentication and user tracking

---

## Tech Stack

- **Node.js** (Backend runtime)
- **Express** (Web framework)
- **MongoDB** & **Mongoose** (Database)
- **Multer** (File uploads)
- **Cors** (Cross-Origin Resource Sharing)
- **dotenv** (Environment variables)

---

## Project Structure

